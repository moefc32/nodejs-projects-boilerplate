import { APP_NAME } from '../source/config';
import { Elysia } from 'elysia';
import token from './token';

export default new Elysia({ name: 'check-token' })
    .use(token)
    .derive(async ({ accessJwt, bearer, status }) => {
        function fail(message: string) {
            return status(401, {
                application: APP_NAME,
                message,
            });
        }

        if (!bearer)
            throw fail('Missing authentication token!');

        try {
            const payload = await accessJwt.verify(bearer);

            if (!payload || payload.type !== 'access')
                throw new Error();

            return { payload }
        } catch (e) {
            if (e instanceof Error && !!e.message) {
                console.error(e);
            }

            throw fail('Invalid authentication token!');
        }
    })
    .as('scoped');

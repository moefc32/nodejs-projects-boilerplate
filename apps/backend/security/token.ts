import {
    JWT_SECRET,
    JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_EXPIRATION,
} from '$source/config';
import { Elysia, t } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import bearer from '@elysiajs/bearer';

export default new Elysia({ name: 'token' })
    .use(jwt({
        name: 'accessJwt',
        secret: JWT_SECRET as string,
        exp: JWT_ACCESS_EXPIRATION,
        schema: t.Object({
            id: t.String(),
            type: t.Literal('access'),
        }),
    }))
    .use(jwt({
        name: 'refreshJwt',
        secret: JWT_SECRET as string,
        exp: JWT_REFRESH_EXPIRATION,
        schema: t.Object({
            id: t.String(),
            type: t.Literal('refresh'),
        }),
    }))
    .use(bearer())
    .derive(({ bearer }) => {
        return { bearer };
    });

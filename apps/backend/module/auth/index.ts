import { APP_NAME } from '$source/config';
import { Elysia, t } from 'elysia';
import checkToken from '$security/checkToken';
import token from '$security/token';
import prisma from '$source/prisma';
import pw from '$utility/pw';

export default new Elysia({ name: 'auth-routes' })
    .use(token)
    .group('', (app) => app
        .use(checkToken)
        .patch('/user', async ({ body, payload, status }) => {
            const {
                email,
                password,
            } = body;

            if (!email && !password) {
                return status(400, {
                    application: APP_NAME,
                    message: 'No data provided for update!'
                });
            }

            try {
                const result = await prisma.users.update({
                    where: { public_id: payload.id },
                    data: {
                        email: email ?? undefined,
                        password: password ? await pw.hash(password) : undefined,
                    },
                    select: {
                        email: true,
                        updated_at: true,
                    },
                });

                return status(200, {
                    application: APP_NAME,
                    message: 'User data updated successfully.',
                    data: {
                        id: payload.id,
                        ...result,
                    },
                });
            } catch (e) {
                console.error(e);

                return status(500, {
                    application: APP_NAME,
                    message: 'Error when updating user data!',
                });
            }
        }, {
            body: t.Object({
                email: t.Optional(
                    t.String({
                        format: 'email',
                    })
                ),
                password: t.Optional(
                    t.String({
                        minLength: 12,
                    })
                ),
            }),
        })
    )
    .post('/login', async ({ body, accessJwt, refreshJwt, status }) => {
        const {
            email,
            password,
            remember,
        } = body;

        try {
            const lookData = await prisma.users.findUnique({
                where: { email },
                select: {
                    public_id: true,
                    password: true,
                },
            });

            if (!lookData || !(await pw.compare(password, lookData.password))) {
                return status(401, {
                    application: APP_NAME,
                    message: 'Wrong email or password, please try again!',
                });
            }

            const accessToken = await accessJwt.sign({
                id: lookData.public_id,
                type: 'access',
            });

            const refreshToken = remember
                ? await refreshJwt.sign({
                    id: lookData.public_id,
                    type: 'refresh',
                })
                : undefined;

            return status(200, {
                application: APP_NAME,
                message: 'Login success.',
                data: {
                    accessToken,
                    refreshToken,
                },
            });
        } catch (e) {
            console.error(e);

            return status(500, {
                application: APP_NAME,
                message: 'Login failed, please try again!',
            });
        }
    }, {
        body: t.Object({
            email: t.String({
                format: 'email',
            }),
            password: t.String(),
            remember: t.Optional(
                t.Boolean()
            ),
        }),
    });

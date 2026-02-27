import { APP_NAME } from './config';
import { Elysia } from 'elysia';
import route from './elysia';

import defaultRoutes from '$module/default';
import authRoutes from '$module/auth';

// Modular routes start here

route
    .use(defaultRoutes)
    .use(new Elysia({ prefix: '/auth' }).use(authRoutes))
    .onError(({ code, status }) => {
        if (code === 'NOT_FOUND') {
            return status(404, {
                application: APP_NAME,
                message: 'Route or method not found!',
            });
        }
    });

// End of routes

export default route;

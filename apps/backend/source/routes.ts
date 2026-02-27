import { APP_NAME } from './configs';
import route from './elysia';

import defaultRoutes from '../modules/default/routes';

// Modular routes start here

route.group('', defaultRoutes)

route.onError(({ code, set }) => {
    if (code === 'NOT_FOUND') {
        set.status = 404

        return {
            application: APP_NAME,
            message: 'Route or method not found!',
        }
    }
})

// End of routes

export default route;

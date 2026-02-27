import { APP_NAME } from '../../source/configs.js';

export default {
    root: async ({ status }) => {
        return await status(200, {
            application: APP_NAME,
            message: 'Application is running.',
        });
    },
    robotsTxt: async ({ set }) => {
        set.status = 200;
        set.headers['Content-Type'] = 'text/plain';

        return `User-agent: *\nDisallow: /`;
    },
}

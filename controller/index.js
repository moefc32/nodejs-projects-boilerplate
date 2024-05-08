const { APP_NAME } = require('../src/configs');
const model = require('../model');

module.exports = {
    healthCheck: async (req, res) => {
        return await res.status(200).send({
            application: APP_NAME,
            message: 'Application is healthy.',
        })
    },
    checkData: async (req, res) => {
        return await res.status(200).send({
            application: APP_NAME,
            message: model.data,
        })
    },
    root: async (req, res) => {
        return await res.status(200).view('./view/index.ejs', {
            app_name: APP_NAME,
        });
    },
    notFound: async (req, res) => {
        return await res.status(404).view('./view/notfound.ejs', {
            app_name: APP_NAME,
        });
    },
}

const { APP_NAME } = require('../src/configs');
const model = require('../model');

module.exports = {
    healthCheck: async (req, res) => {
        res.status(200).send({
            application: APP_NAME,
            message: 'Application is healthy.',
            statusCode: 200,
        })
    },
    checkData: async (req, res) => {
        res.status(200).send({
            application: APP_NAME,
            message: model.data,
            statusCode: 200,
        })
    },
    root: (req, res) => {
        res.view('./view/html/index.ejs', { app_name: APP_NAME });
    }
}

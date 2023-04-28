require('dotenv').config();

module.exports = {
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 3000,
    IPBIND: process.env.IPBIND || '127.0.0.1',
}

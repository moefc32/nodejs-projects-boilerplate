require('dotenv').config();

module.exports = {
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 4000,
    IPBIND: process.env.IPBIND || '127.0.0.1',
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_DB: process.env.MONGO_DB,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1d',
}

export const {
    APP_NAME,
    IPBIND = '127.0.0.1',
    PORT = 4000,
    JWT_SECRET,
    JWT_ACCESS_EXPIRATION = '1h',
    JWT_REFRESH_EXPIRATION = '6h',
    SIZE_LIMIT = '10MB',
} = Bun.env;

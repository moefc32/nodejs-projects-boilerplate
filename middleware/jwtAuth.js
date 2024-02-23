const { APP_NAME, JWT_SECRET } = require('../src/configs');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (bearerToken) {
        const token = bearerToken.split(' ')[1];
        const verify = jwt.verify(token, JWT_SECRET, (e, decoded) => {
            if (e) {
                console.error(e);

                return res.status(401).send({
                    application: APP_NAME,
                    message: 'Invalid authentication token!',
                });
            }
        });

        next();
    } else {
        return res.status(401).send({
            application: APP_NAME,
            message: 'Missing authentication token!',
        });
    }
}

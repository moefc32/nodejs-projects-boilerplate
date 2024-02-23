const { JWT_SECRET } = require('../src/configs');
const jwt = require('jsonwebtoken');

function validateToken(bearerHeader) {
    if (!bearerHeader) return false;
    const token = bearerHeader.split(' ')[1];

    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = validateToken;

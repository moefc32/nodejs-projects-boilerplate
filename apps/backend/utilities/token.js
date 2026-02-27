import { JWT_SECRET } from '../source/configs.js';
import jwt from 'jsonwebtoken';

export default function decodeToken(token) {
    if (!token) return false;

    const payload = jwt.decode(token);
    return payload || false;
}

export function validateToken(bearer) {
    if (!bearer) return false;

    const token = bearer.split(' ')[1];
    if (!token) return false;

    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return false;
    }
}

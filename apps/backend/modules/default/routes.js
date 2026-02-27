import { Elysia } from 'elysia';
import controller from './controller.js';

export default (route) => route
    .get('/', controller.root)
    .get('/robots.txt', controller.robotsTxt)

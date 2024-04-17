const route = require('./fastify');
const c = require('../controller');

// Routes start here

route.get('/', c.root);
route.get('/check-data', c.checkData);
route.get('/health-check', c.healthCheck);

route.setNotFoundHandler(c.notFound);

// End of routes

module.exports = route;

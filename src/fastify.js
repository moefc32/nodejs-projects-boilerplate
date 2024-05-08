const fastify = require('fastify');
const path = require('path');

const app = fastify({
    logger: true,
    disableRequestLogging: true
});

app.register(require('@fastify/helmet'), {
    contentSecurityPolicy: false,
});

app.register(require('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
});

app.register(require('@fastify/static'), {
    root: path.join(__dirname, '../view'),
});

app.register(require('@fastify/static'), {
    root: path.join(__dirname, '../node_modules'),
    prefix: '/static/',
    decorateReply: false,
});

app.register(require('@fastify/view'), {
    engine: {
        ejs: require('ejs'),
    },
});

app.register(require('@fastify/formbody'));
app.register(require('@fastify/multipart'));

module.exports = app;

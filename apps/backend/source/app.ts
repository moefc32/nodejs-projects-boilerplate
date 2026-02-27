import { IPBIND, PORT } from './configs';
import app from './routes';

app.listen({
    hostname: IPBIND,
    port: PORT
});

console.log(
    `${app.config.name} is running at http://${app.server.hostname}:${app.server.port}`
);

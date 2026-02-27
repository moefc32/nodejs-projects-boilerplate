import { APP_NAME, SIZE_LIMIT } from './configs';
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';
import { rateLimit } from 'elysia-rate-limit';
import parseByte from '../utilities/parseByte';

const app = new Elysia({
    name: APP_NAME,
    aot: true,
    serve: {
        maxRequestBodySize:
            parseByte(SIZE_LIMIT, 2097152 as any) as number,
    },
});

app.use(cors());

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            frameAncestors: ["'none'"],
        },
    },
    crossOriginOpenerPolicy: {
        policy: 'same-origin-allow-popups',
    },
}));

app.use(rateLimit({
    duration: 60000,
    max: 100,
}));

export default app;

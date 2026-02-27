import {
    APP_NAME,
    SIZE_LIMIT,
} from './config';
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';
import { rateLimit } from 'elysia-rate-limit';
import bearer from '$security/bearer';
import jwt from '$security/token';
import parseByte from '$utility/parseByte';

const app = new Elysia({
    name: APP_NAME,
    aot: true,
    serve: {
        maxRequestBodySize:
            parseByte(SIZE_LIMIT, 2 * 1024 * 1024 as any) as number,
    },
})
    .use(cors())
    .use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                frameAncestors: ["'none'"],
            },
        },
        crossOriginOpenerPolicy: {
            policy: 'same-origin-allow-popups',
        },
    }))
    .use(rateLimit({
        duration: 60 * 1000,
        max: 100,
    }));

export default app;
export type App = typeof app;

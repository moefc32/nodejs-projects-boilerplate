import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../prisma/generated/client';

const databaseUrl = new URL(Bun.env.DATABASE_URL as string);
const adapter = new PrismaMariaDb({
    host: databaseUrl.hostname,
    port: parseInt(databaseUrl.port, 10),
    user: databaseUrl.username,
    password: databaseUrl.password,
    database: databaseUrl.pathname.slice(1),
    connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export default prisma;

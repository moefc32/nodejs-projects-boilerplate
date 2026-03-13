import { Elysia, InvalidCookieSignature } from 'elysia';
import bearer from '@elysiajs/bearer';
import { timingSafeEqual } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '$db/drizzle';
import { MicroserviceKeys } from '$db/schema';

export default new Elysia({ name: 'm2m-auth' })
    .use(bearer())
    .onBeforeHandle({ as: 'global' }, async ({ bearer }) => {
        if (!bearer) throw new InvalidCookieSignature();

        const lastUnderscoreIndex = bearer.lastIndexOf('_');
        if (lastUnderscoreIndex === -1) throw new InvalidCookieSignature();

        const name = bearer.substring(0, lastUnderscoreIndex);
        console.log('incoming request from: ', name);

        const [record] = await db.select({
            hash: MicroserviceKeys.hash
        })
            .from(MicroserviceKeys)
            .where(eq(MicroserviceKeys.name, name))
            .limit(1);

        if (!record) throw new InvalidCookieSignature();

        const incomingHash = new Bun.CryptoHasher('sha256')
            .update(bearer).digest('hex');

        console.log('Incoming:', incomingHash.length, 'Stored:', record.hash.length);

        const test = timingSafeEqual(
            Buffer.from(incomingHash),
            Buffer.from(record.hash)
        );

        if (!test) throw new InvalidCookieSignature();
    });

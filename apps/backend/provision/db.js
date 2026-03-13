import { eq, sql } from 'drizzle-orm';
import { db } from '$db/drizzle';
import { MicroserviceKeys, Users } from '$db/schema';
import auth from '$source/auth';
import { print } from './cli';

export async function checkUsers() {
    try {
        const [isUserExist] = await db.select()
            .from(Users).limit(1);

        return !!isUserExist;
    } catch (e) {
        throw e;
    }
}

export async function createAdminCredentials(email, password) {
    try {
        const [existing] = await db
            .select({ id: Users.id })
            .from(Users)
            .where(eq(Users.email, email))
            .limit(1);

        if (existing) {
            print.warn('\nWarning: same credential already exists, skipping account creation.');
            return;
        }

        await auth.api.createUser({
            body: {
                name: 'Administrator',
                email,
                password,
            }
        });
    } catch (e) {
        throw e;
    }
}

export async function registerServices(services) {
    try {
        await db.transaction(async (tx) => {
            for (const service of services) {
                await tx
                    .insert(MicroserviceKeys)
                    .values({
                        name: service.name,
                        hash: service.hash
                    })
                    .onDuplicateKeyUpdate({
                        set: {
                            hash: sql`VALUES(hash)`,
                        },
                    });
            }
        });
    } catch (e) {
        throw e;
    }
}

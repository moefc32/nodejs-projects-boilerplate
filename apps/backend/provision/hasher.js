import { randomBytes } from 'node:crypto';

export function generateKeyHashes(serviceNames) {
    const serviceResults = [];

    for (const name of serviceNames) {
        const entropy = randomBytes(16).toString('hex');
        const serviceKey = `${name}_${entropy}`;
        const serviceHash = new Bun.CryptoHasher('sha256')
            .update(serviceKey).digest('hex');

        serviceResults.push({
            name,
            key: serviceKey,
            hash: serviceHash,
        });
    }

    return serviceResults;
}

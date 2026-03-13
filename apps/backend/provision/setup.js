import { inputNewCredentials, print } from './cli';
import { checkUsers, createAdminCredentials, registerServices } from './db';
import { generateKeyHashes } from './hasher';

const REQUIRED_SERVICES = [
    'frontend',
];

async function setup() {
    print.header('\n--[ SYSTEM PROVISIONING ]-----');

    try {
        // 1. Admin credentials
        const isUserExist = await checkUsers();
        const { email, password } = await inputNewCredentials(isUserExist);

        // 2. Generate M2M service key(s)
        const serviceResults = generateKeyHashes(REQUIRED_SERVICES);
        const isPluralService = serviceResults.length > 1;

        // 3. Database transaction
        print.text('\nWriting configurations to database...');

        if (email && password) await createAdminCredentials(email, password);
        await registerServices(serviceResults);

        // 4. Final output for DX
        print.success('\nSystem provisioning successful.\n');

        print.header('--[ SERVICE KEYS ]------------');
        print.text(isPluralService
            ? 'Store these values in their respective .env files :'
            : 'Store this value in its respective .env file :'
        );

        serviceResults.forEach((service) => {
            console.log(service.key);
        });
        print.warn(isPluralService
            ? '\nNote: These keys are shown only once and cannot be recovered, do not lose them.\n'
            : '\nNote: This key are shown only once and cannot be recovered, do not lose it.\n'
        );
    } catch (e) {
        print.error(e.message);
        process.exit(1);
    }

    process.exit(0);
}

setup();

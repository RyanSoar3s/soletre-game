import { join } from 'path';

const serverDistPath = join(process.cwd(), "../dist/soletre/server/server.mjs");

export default import(serverDistPath).then((module) => module.app);

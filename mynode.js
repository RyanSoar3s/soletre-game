import { writeFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const content = `
  export const environment = {
    production: true,
    apiUrl: "${process.env.ORIGIN}",
    CLIENT_SECRET_KEY: '${process.env.CLIENT_SECRET_KEY}'

  };
`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

writeFileSync(join(__dirname, 'src/environments/environment.ts'), content);
console.log('✅ environment.ts gerado com sucesso');

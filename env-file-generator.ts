const fs = require('fs')

const production = process.env["PRODUCTION"] || 'false';
const localStoreKey = process.env["LOCAL_STORE_KEY"] || '';
const firebaseAuthUrl = process.env["FIREBASE_AUTH_URL"] || '';
const firebaseApiKey = process.env["FIREBASE_API_KEY"] || '';
const firebaseDbUrl = process.env["FIREBASE_DB_URL"] || '';

const envContent = `
export const environment = {
  production: ${production.toLowerCase() === 'true'},
  localStoreKey: '${localStoreKey}',
  firebaseAuthUrl: '${firebaseAuthUrl}',
  firebaseApiKey: '${firebaseApiKey}',
  firebaseDbUrl: '${firebaseDbUrl}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', envContent.trim());
fs.writeFileSync('./src/environments/environment.prod.ts', envContent.trim());

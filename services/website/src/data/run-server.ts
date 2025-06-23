import { startReadServer } from './server.js';

const dataDir = process.argv[2] || './data';

startReadServer(dataDir).then(() => {
  // Keep server running
  process.on('SIGINT', () => {
    console.log('\n📖 Shutting down read server...');
    process.exit(0);
  });
}).catch(console.error);
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
require('dotenv').config(); // Charger .env par défaut après

console.log('=== Vérification de l\'environnement ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('=====================================');

// Vérifier quel fichier .env est utilisé
const fs = require('fs');
const path = require('path');

const envFiles = [
  `.env.${process.env.NODE_ENV || 'development'}`,
  '.env'
];

console.log('Fichiers .env chargés:');
envFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} (existe)`);
  } else {
    console.log(`❌ ${file} (n'existe pas)`);
  }
});

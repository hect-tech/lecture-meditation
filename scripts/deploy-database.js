const { execSync } = require('child_process');
const fs = require('fs');

// Configuration
const renderConfig = {
  connectionString: process.env.RENDER_DATABASE_URL || process.env.DATABASE_URL,
};

async function deployDatabase() {
  if (!renderConfig.connectionString) {
    console.error(
      'RENDER_DATABASE_URL (ou DATABASE_URL) manquant. Fournissez la chaîne de connexion Render Postgres.',
    );
    process.exitCode = 1;
    return;
  }

  const backupDir = 'backups';
  const latestBackup = fs.readdirSync(backupDir)
    .filter(file => file.endsWith('.sql'))
    .sort()
    .pop();
    
  if (!latestBackup) {
    console.error('Aucun backup trouvé. Exécutez d\'abord npm run backup');
    return;
  }
  
  console.log(`Déploiement du backup : ${latestBackup}`);
  
  try {
    // Restaurer sur Render
    const restoreCommand = `psql "${renderConfig.connectionString}" < ${backupDir}/${latestBackup}`;
    execSync(restoreCommand, { stdio: 'inherit', shell: true });
    
    console.log('✅ Base de données déployée avec succès !');
    console.log(`📊 Données restaurées depuis : ${latestBackup}`);
    
  } catch (error) {
    console.error('❌ Erreur lors du déploiement :', error.message);
    process.exitCode = 1;
  }
}

deployDatabase();

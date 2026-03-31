const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  databaseUrl: process.env.SOURCE_DATABASE_URL || process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

function createBackup() {
  const hasUrl = Boolean(config.databaseUrl);
  const hasParts = Boolean(config.host && config.port && config.database && config.user);

  if (!hasUrl && !hasParts) {
    console.error(
      'Configuration DB manquante. Fournissez SOURCE_DATABASE_URL (recommandé) ou DB_HOST/DB_PORT/DB_NAME/DB_USER (et DB_PASSWORD si nécessaire).',
    );
    process.exitCode = 1;
    return;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = `backup-lecture-dev-${timestamp}.sql`;
  
  // Créer le dossier backups s'il n'existe pas
  if (!fs.existsSync('backups')) {
    fs.mkdirSync('backups');
  }
  
  const pgDumpCommand = hasUrl
    ? `pg_dump "${config.databaseUrl}" > backups/${backupFile}`
    : `pg_dump -h ${config.host} -p ${config.port} -U ${config.user} -d ${config.database} > backups/${backupFile}`;
  
  try {
    console.log('Création du backup...');
    execSync(pgDumpCommand, { stdio: 'inherit', shell: true });
    console.log(`Backup créé : backups/${backupFile}`);
    
    // Créer un script de restauration
    const renderUrl = process.env.RENDER_DATABASE_URL || process.env.TARGET_DATABASE_URL;
    const restoreScript = `#!/bin/bash
psql "${renderUrl || '$RENDER_DATABASE_URL'}" < backups/${backupFile}
`;
    
    fs.writeFileSync(`backups/restore-${timestamp}.sh`, restoreScript);
    console.log(`Script de restauration créé : backups/restore-${timestamp}.sh`);
    
  } catch (error) {
    console.error('Erreur lors du backup :', error.message);
  }
}

createBackup();

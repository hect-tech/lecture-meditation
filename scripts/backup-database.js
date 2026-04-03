const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration selon l'environnement
const isDevelopment = process.env.NODE_ENV === 'development';

// Configuration locale (développement)
const localConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'lecture_dev',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '1234'
};

// Configuration production (Render)
const renderConfig = {
  connectionString: process.env.DATABASE_URL
};

function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = `backup-lecture-${isDevelopment ? 'dev' : 'prod'}-${timestamp}.sql`;
  
  // Créer le dossier backups s'il n'existe pas
  if (!fs.existsSync('backups')) {
    fs.mkdirSync('backups');
  }
  
  console.log(`🔄 Création du backup depuis l'environnement : ${process.env.NODE_ENV}`);
  
  try {
    let pgDumpCommand;
    
    if (isDevelopment) {
      // Backup depuis la base locale
      pgDumpCommand = `pg_dump -h ${localConfig.host} -p ${localConfig.port} -U ${localConfig.user} -d ${localConfig.database} > backups/${backupFile}`;
    } else {
      // Backup depuis la base de production
      pgDumpCommand = `pg_dump "${renderConfig.connectionString}" > backups/${backupFile}`;
    }
    
    // Exécuter avec les variables d'environnement
    const env = { ...process.env, PGPASSWORD: localConfig.password };
    execSync(pgDumpCommand, { stdio: 'inherit', env });
    
    console.log(`✅ Backup créé : backups/${backupFile}`);
    
    return backupFile;
    
  } catch (error) {
    console.error('❌ Erreur lors du backup :', error.message);
    throw error;
  }
}

createBackup();

const { Client } = require('pg');

// Configuration locale
const localConfig = {
  host: 'localhost',
  port: 5432,
  database: 'lecture_dev',
  user: 'postgres',
  password: '1234'
};

// Configuration Render
const renderConfig = {
  connectionString: 'postgresql://lecture_dev_user:UJGpEzo2RNDAkysvC0pqvR8QUqcgJHq2@dpg-d7557t9aae7s73breb0g-a.oregon-postgres.render.com/lecture_dev'
};

async function transferDatabase() {
  const localClient = new Client(localConfig);
  const renderClient = new Client(renderConfig);
  
  try {
    // Connexion locale
    await localClient.connect();
    console.log('Connecté à la base locale');
    
    // Récupérer les tables
    const tables = await localClient.query(`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    `);
    
    // Connexion Render
    await renderClient.connect();
    console.log('Connecté à la base Render');
    
    // Transférer chaque table
    for (const table of tables.rows) {
      const tableName = table.tablename;
      console.log(`Transfert de la table: ${tableName}`);
      
      // Récupérer les données
      const data = await localClient.query(`SELECT * FROM ${tableName}`);
      
      // Insérer dans Render
      if (data.rows.length > 0) {
        const columns = Object.keys(data.rows[0]);
        const values = data.rows.map(row => 
          columns.map(col => `'${row[col]}'`).join(', ')
        ).join('), (');
        
        await renderClient.query(`
          INSERT INTO ${tableName} (${columns.join(', ')}) 
          VALUES (${values})
        `);
      }
    }
    
    console.log('Transfert terminé !');
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await localClient.end();
    await renderClient.end();
  }
}

transferDatabase();

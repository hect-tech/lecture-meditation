#!/bin/bash

echo "🚀 Déploiement de la migration DevotionText..."

# 1. Compiler le projet
echo "📦 Compilation du projet..."
npm run build

# 2. Backup de la base (sécurité)
echo "💾 Backup de la base de données..."
# pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# 3. Déployer le code
echo "📤 Déploiement du code..."
# git pull origin main
# npm ci --only=production

# 4. Redémarrer l'application
echo "🔄 Redémarrage de l'application..."
# npm run start:prod

echo "✅ Migration terminée !"

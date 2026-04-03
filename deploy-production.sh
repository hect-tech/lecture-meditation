#!/bin/bash

echo "🚀 DÉPLOIEMENT EN PRODUCTION - Migration DevotionText"

# Vérifications
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL non défini"
    exit 1
fi

# 1. Backup de la base de données
echo "💾 Backup de la base de données..."
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
pg_dump $DATABASE_URL > $BACKUP_FILE
echo "✅ Backup créé: $BACKUP_FILE"

# 2. Compiler le projet
echo "📦 Compilation du projet..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur de compilation"
    exit 1
fi

# 3. Nettoyer les node_modules et réinstaller
echo "🧹 Nettoyage des dépendances..."
rm -rf node_modules
npm ci --only=production

# 4. Déployer le code
echo "📤 Déploiement du code..."
git add .
git commit -m "fix: migration DevotionText - ajout colonnes devotionId et textId"
git push origin main

# 5. Attendre le déploiement (adapter selon votre CI/CD)
echo "⏳ Attente du déploiement..."
sleep 30

# 6. Vérifier que l'API fonctionne
echo "🔍 Test de l'API..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://votre-api.com/devotion/today?lang=fr)
if [ "$RESPONSE" = "200" ]; then
    echo "✅ API fonctionnelle après migration"
else
    echo "❌ API non fonctionnelle - rollback nécessaire"
    # Restaurer le backup si nécessaire
    # psql $DATABASE_URL < $BACKUP_FILE
    exit 1
fi

echo "🎉 Déploiement terminé avec succès !"

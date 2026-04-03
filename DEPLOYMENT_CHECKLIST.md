# 🚀 CHECKLIST DÉPLOIEMENT PRODUCTION

## ✅ Pré-déploiement

- [ ] Base de données backupée
- [ ] Code compilé (`npm run build`)
- [ ] Migration testée en développement
- [ ] Variables d'environnement vérifiées
- [ ] Endpoint `/devotion/today?lang=fr` testé

## 🔄 Processus de migration

### Étapes automatiques (TypeORM)
1. ✅ Ajout colonnes `devotionId` et `textId` (nullable)
2. ✅ Mise à jour des données existantes
3. ✅ Création contraintes foreign key
4. ✅ Rendre colonnes NOT NULL

### Points critiques
- **Backup obligatoire** avant migration
- **Rollback possible** avec `down()` de la migration
- **Monitoring** des logs pendant déploiement

## 🧪 Post-déploiement

- [ ] API répond correctement (status 200)
- [ ] Auteurs s'affichent (`"author": "BAB"`)
- [ ] Livres s'affichent (`"book": "Sélections des Écrits du Bab"`)
- [ ] Filtrage par langue fonctionne
- [ ] Création de devotion fonctionne

## 🚨 En cas d'erreur

1. **Analyser les logs** de l'application
2. **Vérifier la migration** dans la base
3. **Rollback** si nécessaire :
   ```bash
   npm run typeorm migration:revert
   ```

## 📝 Notes importantes

- La migration est **idempotente** (peut être relancée)
- Les contraintes CASCADE assurent l'intégrité
- Les endpoints existants ne sont pas impactés

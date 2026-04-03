# � LECTURE MÉDITATION - Architecture & Déploiement

## 🎯 IDÉE DE L'APPLICATION

Application de **lecture méditative** qui fournit quotidiennement :
- **Textes sacrés** baha'is pour la méditation
- **Moments de prière** (matin/soir) 
- **Multilingue** (Français, Anglais, etc.)
- **Calendrier baha'i** intégré

## 🏗️ ARCHITECTURE TECHNIQUE

### **Backend NestJS**
- **API REST** pour les dévotions quotidiennes
- **Base de données PostgreSQL** avec TypeORM
- **Relations complexes** : Devotion → DevotionText → Text → Book → Author
- **Gestion multilingue** avec entités Language

### **Entités principales**
```typescript
Devotion {
  id, date, bahaiMonth, day
  → DevotionText[] (plusieurs textes par dévotion)
}

DevotionText {
  id, moment (MORNING/EVENING), displayOrder
  → Devotion (relation many-to-one)
  → Text (relation many-to-one)
}

Text {
  content, reference
  → Language (langue du texte)
  → Book (livre source)
  → Author (via Book)
}
```

## 🚀 DÉPLOIEMENT

### **Environnements**
- **Développement** : `.env` → Base locale PostgreSQL
- **Production** : `.env.production` → Base Render/Railway PostgreSQL

### **Processus de migration**
1. **TypeORM automatique** : `migrationsRun: true` en production
2. **Schéma évolutif** : Ajout progressif des colonnes/relations
3. **Intégrité** : Contraintes foreign key avec CASCADE

## ✅ CHECKLIST DÉPLOIEMENT PRODUCTION

### **🔧 Pré-déploiement**
- [ ] Code compilé (`npm run build`)
- [ ] Migration testée en développement
- [ ] Variables production vérifiées (`.env.production`)
- [ ] Base de données backupée (Render)

### **🔄 Migration automatique (Railway)**
1. ✅ Détection nouvelle entité `DevotionText`
2. ✅ Ajout colonnes `devotionId`, `textId` (nullable)
3. ✅ Mise à jour données existantes
4. ✅ Création contraintes foreign key
5. ✅ Application NOT NULL

### **🧪 Post-déploiement**
- [ ] API répond (status 200)
- [ ] **Auteurs visibles** : `"author": "BAB"` ✨
- [ ] **Livres corrects** : `"book": "Sélections des Écrits du Bab"`
- [ ] **Filtrage langue** : `?lang=fr` fonctionnel
- [ ] **Tri chronologique** : Matin → Soir

## 🎯 FONCTIONNALITÉS CLÉS

### **Endpoint principal**
```
GET /devotion/today?lang=fr
→ Retourne les textes du jour avec :
  - Contenu méditatif
  - Références sacrées
  - Auteurs et livres
  - Moments (matin/soir)
```

### **Gestion multilingue**
- **Textes traduits** dans plusieurs langues
- **Filtrage automatique** par code langue
- **Fallback** vers français si non disponible

### **Calendrier intégré**
- **Jours baha'is** avec mois sacrés
- **Correspondance** calendrier grégorien
- **Calcul automatique** des dates

## 🚨 GESTION DES ERREURS

### **Problèmes résolus**
- ✅ **Route NaN** : Réorganisation routes controller
- ✅ **Timezone** : Gestion dates UTC/local
- ✅ **Relations null** : Colonnes foreign key explicites
- ✅ **Auteurs manquants** : Jointure Book → Author

### **Monitoring**
- **Logs détaillés** pour debugging
- **Réponses structurées** avec `ResponseService`
- **Codes HTTP** appropriés (200, 404, 400)

## 📝 NOTES IMPORTANTES

### **Philosophie de l'app**
- **Accessibilité** : Textes simples et clairs
- **Spiritualité** : Contenus authentiques et respectueux
- **Routine** : Usage quotidien encouragé
- **Communauté** : Partage et méditation collective

### **Évolution future**
- **Audio** : Textes lus par des voix
- **Notifications** : Rappels de méditation
- **Statistiques** : Suivi pratique personnelle
- **Partage social** : Envoyer aux proches

---

**🌟 Mission** : Offrir une expérience méditative enrichissante au quotidien

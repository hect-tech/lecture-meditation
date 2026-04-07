# lecture-meditation

Application de **lecture méditative quotidienne** basée sur les textes sacrés baha'is, développée avec NestJS.

## Mission

Offrir une expérience méditative enrichissante au quotidien à travers des textes sacrés, des prières et des moments de réflexion spirituelle.

## Fonctionnalités

- **Textes quotidiens** : Méditations guidées avec textes sacrés baha'is
- **Moments de prière** : Matin et soir pour structurer la journée
- **Multilingue** : Support du français, anglais et autres langues
- **Calendrier baha'i** : Intégration du calendrier sacré
- **API REST** : Endpoints complets pour la gestion des dévotions

## Architecture

### **Backend NestJS**
- **Base de données** : PostgreSQL avec TypeORM
- **Entités principales** : Devotion, DevotionText, Text, Book, Author, Language
- **Relations complexes** : Gestion des foreign keys et jointures SQL
- **Gestion multilingue** : Filtrage par code langue

### **Structure des données**
```
Devotion (date, mois baha'i, jour)
  └── DevotionText[] (moment, ordre)
      └── Text (contenu, référence)
          ├── Language (code, nom)
          ├── Book (titre)
          └── Author (nom)
```

## Installation

### **Prérequis**
- Node.js 18+
- PostgreSQL
- npm ou yarn

### **Configuration**
```bash
# Cloner le projet
git clone https://github.com/hect-tech/lecture-meditation.git
cd lecture-meditation

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos configurations BDD
```

## Démarrage

```bash
# Développement
npm run start:dev

# Production
npm run build
npm run start:prod

# Tests
npm run test
npm run test:e2e
```

## API Endpoints

### **Dévotions**
```bash
# Obtenir la dévotion du jour
GET /devotion/today?lang=fr

# Créer une dévotion
POST /devotion/today

# Ajouter un texte à la dévotion du jour
POST /devotion/add-text

# Créer une dévotion complète
POST /devotion/complete
```

### **Langues**
```bash
# Lister les langues disponibles
GET /languages

# Obtenir une langue par code
GET /languages/:code
```

## Base de données

### **Schéma**
- **devotions** : Dévotions quotidiennes avec dates baha'ies
- **devotion_texts** : Textes associés aux dévotions
- **texts** : Contenu des textes sacrés
- **books** : Livres sources
- **authors** : Auteurs (BAB, Baha'u'llah, etc.)
- **languages** : Langues disponibles

### **Migrations**
```bash
# Créer une migration
npm run typeorm migration:create -- -n MigrationName

# Exécuter les migrations
npm run typeorm migration:run

# Annuler la dernière migration
npm run typeorm migration:revert
```

## Déploiement

### **Production (Railway)**
L'application est déployée sur Railway avec :
- **Base de données** : PostgreSQL géré par Railway
- **Migrations automatiques** : `migrationsRun: true` en production
- **URL** : https://votre-app.railway.app

### **Variables d'environnement**
```bash
# Production (.env.production)
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
PORT=3000
```

## Tests

### **Validation de l'API**
```bash
# Test de l'endpoint principal
curl "lecture-meditation-production.up.railway.app/devotion/today?lang=fr"

# Réponse attendue
{
  "data": [
    {
      "content": "Texte méditatif...",
      "reference": "Kitáb-i-Aqdas 123",
      "author": "Baha'u'llah",
      "book": "Sélections des Écrits de Baha'u'llah",
      "moment": "MORNING",
      "displayOrder": 1
    }
  ],
  "message": "Devotion du jour retournée avec succès !"
}
```

## Développement

### **Structure du projet**
```
src/
├── devotion/           # Gestion des dévotions
├── text/              # Gestion des textes
├── language/          # Gestion des langues
├── book/              # Gestion des livres
├── author/            # Gestion des auteurs
├── bahai-date/        # Service calendrier baha'i
├── config/            # Configuration TypeORM
└── migrations/        # Migrations de base de données
```

### **Conventions**
- **TypeScript** strict avec décorateurs
- **DTOs** pour la validation des entrées
- **Services** pour la logique métier
- **Contrôleurs** pour les endpoints REST
- **Entités** TypeORM pour la BDD

## Gestion des erreurs

### **Problèmes résolus**
- **Route NaN** : Réorganisation des routes
- **Timezone** : Gestion dates UTC/local
- **Relations NULL** : Foreign keys explicites
- **Auteurs manquants** : Jointures SQL optimisées
- **Migration production** : Colonnes déjà existantes

### **Monitoring**
- **Logs structurés** avec ResponseService
- **Codes HTTP** appropriés (200, 404, 400)
- **Gestion des retries** base de données

## Contribution

1. Forker le projet
2. Créer une branche `feature/nom-feature`
3. Commiter les changements
4. Pousser et créer une Pull Request

## Notes importantes

### **Philosophie**
- **Accessibilité** : Textes simples et clairs
- **Spiritualité** : Contenus authentiques et respectueux
- **Routine** : Usage quotidien encouragé
- **Communauté** : Partage et méditation collective

### **Évolutions futures**
- **Audio** : Textes lus par des voix
- **Notifications** : Rappels de méditation
- **Statistiques** : Suivi pratique personnelle
- **Partage social** : Envoyer aux proches

## License

Ce projet est sous licence MIT.

---

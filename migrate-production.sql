-- MIGRATION PRODUCTION - DevotionText Fix
-- Exécuter dans l'ordre sur la base de données production

-- 1. Ajouter les colonnes (nullable)
ALTER TABLE "devotion_texts" 
ADD COLUMN "devotionId" integer,
ADD COLUMN "textId" integer;

-- 2. Mettre à jour les enregistrements existants
-- NOTE: Adapter cette requête selon vos données réelles
UPDATE "devotion_texts" dt
SET "devotionId" = d.id, "textId" = t.id
FROM devotions d, texts t
WHERE dt.id BETWEEN 1 AND 1000
AND d.id = dt.id
AND t.id = dt.id;

-- 3. Créer les contraintes foreign key
ALTER TABLE "devotion_texts" 
ADD CONSTRAINT "FK_devotion_texts_devotionId" 
FOREIGN KEY ("devotionId") REFERENCES "devotions"("id") ON DELETE CASCADE;

ALTER TABLE "devotion_texts" 
ADD CONSTRAINT "FK_devotion_texts_textId" 
FOREIGN KEY ("textId") REFERENCES "texts"("id") ON DELETE CASCADE;

-- 4. Rendre les colonnes NOT NULL
ALTER TABLE "devotion_texts" 
ALTER COLUMN "devotionId" SET NOT NULL,
ALTER COLUMN "textId" SET NOT NULL;

-- Vérification
SELECT COUNT(*) as total_devotion_texts FROM "devotion_texts";
SELECT COUNT(*) as null_devotionId FROM "devotion_texts" WHERE "devotionId" IS NULL;
SELECT COUNT(*) as null_textId FROM "devotion_texts" WHERE "textId" IS NULL;

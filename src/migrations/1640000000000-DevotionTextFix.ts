import { MigrationInterface, QueryRunner } from "typeorm";

export class DevotionTextFix1640000000000 implements MigrationInterface {
    name = 'DevotionTextFix1640000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Ajouter les colonnes en nullable d'abord
        await queryRunner.query(`
            ALTER TABLE "devotion_texts" 
            ADD COLUMN "devotionId" integer,
            ADD COLUMN "textId" integer;
        `);

        // 2. Mettre à jour les enregistrements existants
        // Récupérer les relations existantes depuis les autres tables
        await queryRunner.query(`
            UPDATE "devotion_texts" dt
            SET "devotionId" = d.id, "textId" = t.id
            FROM devotions d, texts t
            WHERE dt.id BETWEEN 1 AND 1000
            AND d.id = dt.id
            AND t.id = dt.id
        `);

        // 3. Créer les contraintes foreign key
        await queryRunner.query(`
            ALTER TABLE "devotion_texts" 
            ADD CONSTRAINT "FK_devotion_texts_devotionId" 
            FOREIGN KEY ("devotionId") REFERENCES "devotions"("id") ON DELETE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "devotion_texts" 
            ADD CONSTRAINT "FK_devotion_texts_textId" 
            FOREIGN KEY ("textId") REFERENCES "texts"("id") ON DELETE CASCADE;
        `);

        // 4. Rendre les colonnes NOT NULL
        await queryRunner.query(`
            ALTER TABLE "devotion_texts" 
            ALTER COLUMN "devotionId" SET NOT NULL,
            ALTER COLUMN "textId" SET NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "devotion_texts" 
            DROP CONSTRAINT "FK_devotion_texts_textId",
            DROP CONSTRAINT "FK_devotion_texts_devotionId";
        `);

        await queryRunner.query(`
            ALTER TABLE "devotion_texts" 
            DROP COLUMN "textId",
            DROP COLUMN "devotionId";
        `);
    }
}

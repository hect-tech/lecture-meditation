import { MigrationInterface, QueryRunner } from "typeorm";

export class DevotionTextFix1640000000000 implements MigrationInterface {
    name = 'DevotionTextFix1640000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Les colonnes existent déjà en production
        // Cette migration est déjà appliquée, on ne fait rien
        console.log('Migration DevotionTextFix: colonnes déjà existantes, passage...');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Ne rien faire pour éviter de casser la production
        console.log('Migration DevotionTextFix: rollback non nécessaire');
    }
}

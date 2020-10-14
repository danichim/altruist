import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableUsers1602569799464 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD points INT`);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP COLUMN points`); 
    }
}

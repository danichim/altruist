import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateReportTable1602566492752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`
        CREATE TABLE report (
            id INT NOT NULL AUTO_INCREMENT,
			orderId INT NULL DEFAULT NULL,
            subject VARCHAR(255) NULL,
            message VARCHAR(255) NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (orderId) REFERENCES orders(id))
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`
                DROP TABLE report
        `)
    }
}

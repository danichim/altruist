import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrdersTable1587755193560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`
            CREATE TABLE orders (
              id INT NOT NULL AUTO_INCREMENT,
              title VARCHAR(255) NULL,
              latitude DECIMAL(11,8) NULL,
              longitude DECIMAL(11,8) NULL,
              address TEXT NULL,
              description TEXT NULL,
              expires_at DATETIME NULL,
              status ENUM('open', 'in progress', 'done', 'canceled') NULL,
              created_at DATETIME NULL,
              created_by INT NULL DEFAULT NULL,
              accepted_by INT NULL DEFAULT NULL,
              PRIMARY KEY (id),
              INDEX f1_idx (created_by ASC),
              INDEX f2_idx (accepted_by ASC),
              CONSTRAINT f1
                FOREIGN KEY (created_by)
                REFERENCES users (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
              CONSTRAINT f2
                FOREIGN KEY (accepted_by)
                REFERENCES users (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION);

        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`
                DROP TABLE orders
        `)
    }

}

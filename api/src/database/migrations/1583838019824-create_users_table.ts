import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersTable1583838019824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`
            CREATE TABLE users
            (
                id INT NOT NULL AUTO_INCREMENT,
                name     VARCHAR(255) NULL,
                surname     VARCHAR(255) NULL,
                action_perimeter INT NULL,
                phone VARCHAR(255) NULL,
                email    VARCHAR(255) NOT NULL,
                available    TINYINT(1) NOT NULL DEFAULT 0,
                password VARCHAR(255) NOT NULL,
                latitude DECIMAL(11,8),
                longitude DECIMAL(11,8),
                PRIMARY KEY (id),
                UNIQUE INDEX email_UNIQUE (email ASC)
            );

        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`
                DROP TABLE users
        `)
    }

}

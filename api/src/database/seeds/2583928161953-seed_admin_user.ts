import { MigrationInterface, QueryRunner } from 'typeorm';
import * as crypto from "crypto";

export class AddAdminUser1583928161953 implements MigrationInterface {

    private getData = async (queryRunner: QueryRunner) => {
        let role = await queryRunner.query(`SELECT id from roles WHERE name = 'admin' LIMIT 1`);
        role = role[0].id;
        const password = await crypto.createHmac('sha256', 'admin123').digest('hex');
        return {
           name: 'admin',
           email: 'admin@example.com',
           password: password,
           role: role
       }
    }

    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = await this.getData(queryRunner);
        return queryRunner.query(`
            INSERT INTO users ("name", "email", "password", "role_id") VALUES ('${user.name}', '${user.email}', '${user.password}', ${user.role});
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`DELETE FROM users WHERE email = 'admin@example.com'`)
    }

}

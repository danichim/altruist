import { MigrationInterface, QueryRunner } from 'typeorm';
import { ADMIN_ROLE, USER_ROLE } from '../../auth/constants';

export class SeedRoles1583927847672 implements MigrationInterface {

    private getData = () => ([
        { name: ADMIN_ROLE },
        { name: USER_ROLE },
    ]);

    public async up(queryRunner: QueryRunner): Promise<any> {
        this.getData().map(async (data) => {
            return await queryRunner.query(`
                INSERT INTO roles ("name") VALUES ('${data.name}')
            `)
        });

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        this.getData().map(async (data) => {
            return await queryRunner.query(`
                DELETE FROM roles WHERE name = '${data.name}'
            `)
        });

    }

}

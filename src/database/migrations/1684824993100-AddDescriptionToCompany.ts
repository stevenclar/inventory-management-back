import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionToCompany1684824993100
  implements MigrationInterface
{
  name = 'AddDescriptionToCompany1684824993100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" ADD "description" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "description"`);
  }
}

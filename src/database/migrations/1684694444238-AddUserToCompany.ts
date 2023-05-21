import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserToCompany1684694444238 implements MigrationInterface {
  name = 'AddUserToCompany1684694444238';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`,
    );
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "userId"`);
  }
}

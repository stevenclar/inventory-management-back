import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserToProduct1684690696272 implements MigrationInterface {
  name = 'AddUserToProduct1684690696272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "userId"`);
  }
}

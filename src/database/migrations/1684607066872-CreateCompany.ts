import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompany1684607066872 implements MigrationInterface {
  name = 'CreateCompany1684607066872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("nit" character varying NOT NULL, "name" character varying, "address" character varying, "phone" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_7917f87e3719deca503c1e847e4" PRIMARY KEY ("nit"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a76c5cd486f7779bd9c319afd2" ON "company" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aac23a4cca723471779007fe2f" ON "company" ("address") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e53ef0697f9d5d933fa075be1c" ON "company" ("phone") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e53ef0697f9d5d933fa075be1c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aac23a4cca723471779007fe2f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a76c5cd486f7779bd9c319afd2"`,
    );
    await queryRunner.query(`DROP TABLE "company"`);
  }
}

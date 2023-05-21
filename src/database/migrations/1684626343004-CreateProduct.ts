import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProduct1684626343004 implements MigrationInterface {
  name = 'CreateProduct1684626343004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying(255), "price" numeric(10,2) NOT NULL, "measure" character varying NOT NULL DEFAULT 'unit', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_22cc43e9a74d7498546e9a63e7" ON "product" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_903b6584f093ae370a0faf47d0" ON "product" ("measure") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_903b6584f093ae370a0faf47d0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_22cc43e9a74d7498546e9a63e7"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
  }
}

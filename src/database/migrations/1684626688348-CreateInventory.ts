import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInventory1684626688348 implements MigrationInterface {
  name = 'CreateInventory1684626688348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "description" character varying(255), "availableQuantity" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" integer, "companyNit" character varying, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_94c58ca876bb533408cb0b7d02" ON "inventory" ("availableQuantity") `,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_c8622e1e24c6d054d36e8824490" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" ADD CONSTRAINT "FK_a6597e6651971eab0fc4d347370" FOREIGN KEY ("companyNit") REFERENCES "company"("nit") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inventory" DROP CONSTRAINT "FK_a6597e6651971eab0fc4d347370"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inventory" DROP CONSTRAINT "FK_c8622e1e24c6d054d36e8824490"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_94c58ca876bb533408cb0b7d02"`,
    );
    await queryRunner.query(`DROP TABLE "inventory"`);
  }
}

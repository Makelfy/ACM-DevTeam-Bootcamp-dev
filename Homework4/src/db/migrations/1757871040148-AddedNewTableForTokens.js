/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class AddedNewTableForTokens1757871040148 {
    name = 'AddedNewTableForTokens1757871040148'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "opaque_tokens" ("token" SERIAL NOT NULL, "userId" integer NOT NULL, "action" text NOT NULL, "expiresAt" character varying NOT NULL, "used" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b7e51be3afdce62f6cb4cc2a897" PRIMARY KEY ("token"))`);
        await queryRunner.query(`ALTER TABLE "opaque_tokens" ADD CONSTRAINT "FK_456ac79c0200b97a1f0df644486" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "opaque_tokens" DROP CONSTRAINT "FK_456ac79c0200b97a1f0df644486"`);
        await queryRunner.query(`DROP TABLE "opaque_tokens"`);
    }
}

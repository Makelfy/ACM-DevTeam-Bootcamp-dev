/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class Aa1756926286238 {
    name = 'Aa1756926286238'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_4583be7753873b4ead956f040e3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_4583be7753873b4ead956f040e3"`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "userId" character varying NOT NULL`);
    }
}

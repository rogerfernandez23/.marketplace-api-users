import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTokenTable1724277092441 implements MigrationInterface {
  name = 'CreateTokenTable1724277092441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('male', 'female') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`birth\` datetime NOT NULL DEFAULT '1970-01-01 00:00:00'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` (\`document\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_c1b20b2a1883ed106c3e746c25\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`birth\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`birth\` date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('male', 'female', 'other') NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`token\``);
  }
}

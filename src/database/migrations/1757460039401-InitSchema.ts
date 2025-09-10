import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1757460039401 implements MigrationInterface {
  name = 'InitSchema1757460039401';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('client', 'admin') NOT NULL DEFAULT 'client', \`client_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`REL_0d1e90d75674c54f8660c4ed44\` (\`client_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clients\` (\`id\` varchar(36) NOT NULL, \`company_name\` varchar(255) NOT NULL, \`contact_email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`country\` varchar(255) NOT NULL, \`services_needed\` text NOT NULL, \`budget\` decimal NOT NULL, \`status\` enum ('todo', 'in_progress', 'completed') NOT NULL DEFAULT 'todo', \`client_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`matches\` (\`id\` varchar(36) NOT NULL, \`score\` decimal NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`project_id\` varchar(36) NULL, \`vendor_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`vendors\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`countries_supported\` text NOT NULL, \`services_offered\` text NOT NULL, \`rating\` decimal NOT NULL, \`response_sla_hours\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0d1e90d75674c54f8660c4ed446\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_ca29f959102228649e714827478\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`matches\` ADD CONSTRAINT \`FK_416d7b6f94de26244a7be38d87a\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`matches\` ADD CONSTRAINT \`FK_dfb298e37d26ca75c3b1b1c8010\` FOREIGN KEY (\`vendor_id\`) REFERENCES \`vendors\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`matches\` DROP FOREIGN KEY \`FK_dfb298e37d26ca75c3b1b1c8010\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`matches\` DROP FOREIGN KEY \`FK_416d7b6f94de26244a7be38d87a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_ca29f959102228649e714827478\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0d1e90d75674c54f8660c4ed446\``,
    );
    await queryRunner.query(`DROP TABLE \`vendors\``);
    await queryRunner.query(`DROP TABLE \`matches\``);
    await queryRunner.query(`DROP TABLE \`projects\``);
    await queryRunner.query(`DROP TABLE \`clients\``);
    await queryRunner.query(
      `DROP INDEX \`REL_0d1e90d75674c54f8660c4ed44\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}

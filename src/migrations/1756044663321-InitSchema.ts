import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1756044663321 implements MigrationInterface {
    name = 'InitSchema1756044663321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`role\` enum ('client', 'admin') NOT NULL DEFAULT 'client', \`clientId\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vendors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`countries_supported\` json NOT NULL, \`services_offered\` json NOT NULL, \`rating\` int NOT NULL DEFAULT '0', \`response_sla_hours\` int NOT NULL DEFAULT '48', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`matches\` (\`id\` int NOT NULL AUTO_INCREMENT, \`project_id\` int NOT NULL, \`vendor_id\` int NOT NULL, \`score\` float NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_2c6d7b72a690822ed888d830ee\` (\`project_id\`, \`vendor_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`client_id\` int NOT NULL, \`country\` varchar(255) NOT NULL, \`services_needed\` json NOT NULL, \`budget\` decimal(12,2) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`company_name\` varchar(255) NOT NULL, \`contact_email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`matches\` ADD CONSTRAINT \`FK_416d7b6f94de26244a7be38d87a\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`matches\` ADD CONSTRAINT \`FK_dfb298e37d26ca75c3b1b1c8010\` FOREIGN KEY (\`vendor_id\`) REFERENCES \`vendors\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_ca29f959102228649e714827478\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_ca29f959102228649e714827478\``);
        await queryRunner.query(`ALTER TABLE \`matches\` DROP FOREIGN KEY \`FK_dfb298e37d26ca75c3b1b1c8010\``);
        await queryRunner.query(`ALTER TABLE \`matches\` DROP FOREIGN KEY \`FK_416d7b6f94de26244a7be38d87a\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c6d7b72a690822ed888d830ee\` ON \`matches\``);
        await queryRunner.query(`DROP TABLE \`matches\``);
        await queryRunner.query(`DROP TABLE \`vendors\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}

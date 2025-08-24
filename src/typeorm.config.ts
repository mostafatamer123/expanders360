import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { Client } from './clients/client.entity';
import { Project } from './projects/project.entity';
import { Vendor } from './vendors/vendor.entity';
import { Match } from './matches/match.entity';
import { config } from 'dotenv';

config(); // Load .env

export const typeOrmConfig = (): DataSourceOptions => ({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'mysql',
  port: +(process.env.MYSQL_PORT || 3306),
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '1234',
  database: process.env.MYSQL_DB || 'expanders360',
  entities: [User, Client, Project, Vendor, Match],
  synchronize: true,
  migrations: [__dirname + '/migrations/*{.ts,.js}'], // ✅ support ts + js
});

const AppDataSource = new DataSource(typeOrmConfig());
export default AppDataSource;

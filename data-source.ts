import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ConfigrationService } from './src/config/config.service';

dotenv.config();

const nestConfig = new ConfigService();
const appConfig = new ConfigrationService(nestConfig);
const mysql = appConfig.mysqlConfig;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: mysql.host,
  port: Number(mysql.port),
  username: mysql.username,
  password: mysql.password,
  database: mysql.database,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  migrationsTableName: 'migrations',
});

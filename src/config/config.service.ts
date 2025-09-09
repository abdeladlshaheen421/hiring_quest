import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MysqlConfigInterface, SmtpConfigInterface } from './config.types';

@Injectable()
export class ConfigrationService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get jwtExpireIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN');
  }

  get mysqlConfig(): MysqlConfigInterface {
    return {
      host: this.configService.get<string>('MYSQL_HOST'),
      port: this.configService.get<number>('MYSQL_PORT'),
      username: this.configService.get<string>('MYSQL_USER'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
    };
  }

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI');
  }

  get smtpConfig(): SmtpConfigInterface {
    return {
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      user: this.configService.get<string>('SMTP_USER'),
      pass: this.configService.get<string>('SMTP_PASSWORD'),
    };
  }
}

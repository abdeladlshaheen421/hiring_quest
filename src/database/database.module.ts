import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigrationModule } from 'src/config/config.module';
import { ConfigrationService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigrationModule],
      inject: [ConfigrationService],
      useFactory: async (
        configService: ConfigrationService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        ...configService.mysqlConfig,
        migrations: [__dirname + '/migrations/*.{ts,js}'],
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: false,
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigrationModule],
      inject: [ConfigrationService],
      useFactory: (configService: ConfigrationService) => ({
        uri: configService.mongoUri,
      }),
    }),
  ],
})
export class DataBaseModule {}

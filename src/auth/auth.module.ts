import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigrationModule } from 'src/config/config.module';
import { ConfigrationService } from 'src/config/config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './roles.guard';
import { UsersModule } from 'src/user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigrationModule],
      inject: [ConfigrationService],
      global: true,
      useFactory: async (configService: ConfigrationService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: configService.jwtExpireIn },
      }),
    }),
  ],
  providers: [ConfigrationService, AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailProvider } from './email.provider';
import { ConfigrationService } from 'src/config/config.service';

@Module({
  imports: [],
  providers: [ConfigrationService, NotificationService, EmailProvider],
  exports: [NotificationService, EmailProvider],
})
export class NotificationModule {}

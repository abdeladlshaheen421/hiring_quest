import { Injectable, Logger } from '@nestjs/common';
import { EmailProvider } from './email.provider';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly emailProvider: EmailProvider) {}

  async sendEmail(to: string, subject: string, body: string) {
    const sent = await this.emailProvider.send({ to, subject, text: body });

    return sent && true;
  }
}

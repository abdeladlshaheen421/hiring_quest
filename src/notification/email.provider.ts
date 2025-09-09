import { Injectable } from '@nestjs/common';
import { ConfigrationService } from 'src/config/config.service';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailProvider {
  private transporter: Transporter | null = null;

  constructor(private readonly config: ConfigrationService) {
    const smtp = this.config.smtpConfig;
    if (smtp?.host && smtp?.port) {
      this.transporter = nodemailer.createTransport({
        ...config.smtpConfig,
        auth: { user: config.smtpConfig.user, pass: config.smtpConfig.pass },
      });
    }
  }

  async send(options: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    from?: string;
  }) {
    if (!this.transporter) return false;
    const from = options.from ?? 'no-reply@hiring-quest.local';
    await this.transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    return true;
  }
}

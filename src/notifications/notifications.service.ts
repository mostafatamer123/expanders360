import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: +(process.env.SMTP_PORT || 1025),
    secure: false,
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    } : undefined
  });

  async notifyMatchGeneration(project: any, createdCount: number) {
    const from = process.env.SMTP_FROM || 'no-reply@expanders360.test';
    await this.transporter.sendMail({
      from,
      to: 'ops@expanders360.test',
      subject: `New matches for project #${project.id}`,
      text: `${createdCount} new matches generated for project ${project.id} (${project.country}).`
    });
  }
}

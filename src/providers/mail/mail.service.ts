import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

@Injectable()
export class MailingService {
  private transporter: nodemailer.Transporter;
  private generalTemplate: handlebars.TemplateDelegate;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: process.env.MAILER_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      {
        from: {
          name: 'No-reply',
          address: process.env.MAIL_FROM,
        },
      },
    );

    this.generalTemplate = this.loadTemplate('general.hbs');
  }

  private loadTemplate(templateName: string): handlebars.TemplateDelegate {
    const templatesFolderPath = path.join(
      __dirname,
      './../../../templates/',
    );
    const templatePath = path.join(templatesFolderPath, templateName);

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    return handlebars.compile(templateSource);
  }

}

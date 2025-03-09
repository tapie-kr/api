import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';
import fs from 'node:fs';
import  path from 'node:path';
import { Resend } from 'resend';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EmailService {
  constructor(private readonly httpService: HttpService,
    private readonly configService: ConfigService) {
  }
  async sendEmailHTMLWithArguments(
    from: string,
    to: string,
    reply_to: string,
    subject: string,
    htmlLocation: string,
    argumentsObj: Record<string, string>,
  ) {
    try {
      const filePath = path.join(__dirname, '../..', 'static', htmlLocation);

      let html = fs.readFileSync(filePath, 'utf-8');

      Object.keys(argumentsObj).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');

        html = html.replace(regex, argumentsObj[key]);
      });

      return this.sendEmailHTML(
        from, to, reply_to, subject, html,
      );
    } catch (error) {
      console.error('Error processing email template:', error);

      throw new Error('Failed to load and process email template');
    }
  }
  async sendEmailText(from: string, to: string, subject: string, text: string) {
    const formData = new FormData;

    formData.append('from', from);

    formData.append('to', to);

    formData.append('subject', subject);

    formData.append('plain', text);

    const headers = {
      ...formData.getHeaders(), 'X-Api-Key': this.configService.get('MAILER_API_KEY'),
    };

    try {
      const response = await firstValueFrom(this.httpService.post('https://smtp.maileroo.com/send', formData, { headers }));

      return response.data;
    } catch (error) {
      console.error('Email send error:', error.response?.data || error.message);

      throw new Error('Failed to send email');
    }
  }
  async sendEmailHTML(
    from: string, to: string, reply_to: string, subject: string, html: string,
  ) {
    try {
      const resend = new Resend(this.configService.get('RESEND_API_KEY'));

      const { data  } = await resend.emails.send({
        from:    from,
        to:      [to],
        subject: subject,
        html:    html,
        replyTo: reply_to,
      });

      return data;
    } catch (error) {
      console.error('Email send error:', error);

      throw new Error('Failed to send email');
    }
  }
}

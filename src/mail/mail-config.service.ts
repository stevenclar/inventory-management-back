import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AllConfigType } from 'src/config/config.type';
import * as aws from '@aws-sdk/client-ses';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  createMailerOptions(): MailerOptions {
    const mailerOptions: MailerOptions = {
      transport: {
        host: this.configService.get('mail.host', { infer: true }),
        port: this.configService.get('mail.port', { infer: true }),
        ignoreTLS: this.configService.get('mail.ignoreTLS', { infer: true }),
        secure: this.configService.get('mail.secure', { infer: true }),
        requireTLS: this.configService.get('mail.requireTLS', { infer: true }),
        auth: {
          user: this.configService.get('mail.user', { infer: true }),
          pass: this.configService.get('mail.password', { infer: true }),
        },
      },
      defaults: {
        from: `"${this.configService.get('mail.defaultName', {
          infer: true,
        })}" <${this.configService.get('mail.defaultEmail', { infer: true })}>`,
      },
      template: {
        dir: path.join(
          this.configService.getOrThrow('app.workingDirectory', {
            infer: true,
          }),
          'src',
          'mail',
          'mail-templates',
        ),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
    if (this.configService.get('mail.provider', { infer: true }) === 'ses') {
      const ses = new aws.SES({
        region: this.configService.get('mail.sesRegion', { infer: true }),
        credentials: {
          accessKeyId:
            this.configService.get('mail.sesAccessKey', {
              infer: true,
            }) ?? '',
          secretAccessKey:
            this.configService.get('mail.sesSecretAccessKey', {
              infer: true,
            }) ?? '',
        },
      });
      mailerOptions.transport.SES = {
        ses,
        aws,
      };
    }
    return mailerOptions;
  }
}

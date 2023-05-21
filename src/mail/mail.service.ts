import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';
import { MailData, MailDataAttachment } from './interfaces/mail-data.interface';
import { AllConfigType } from 'src/config/config.type';
import { MaybeType } from '../utils/types/maybe.type';
import { attachmentsImages } from 'src/utils/constants/email';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let emailConfirmTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [emailConfirmTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.confirmEmail'),
        i18n.t('confirm-email.text1'),
        i18n.t('confirm-email.text2'),
        i18n.t('confirm-email.text3'),
      ]);
    }

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${this.configService.get('app.frontendDomain', {
        infer: true,
      })}/confirm-email/${mailData.data.hash} ${emailConfirmTitle}`,
      template: 'activation',
      context: {
        title: emailConfirmTitle,
        url: `${this.configService.get('app.frontendDomain', {
          infer: true,
        })}/confirm-email/${mailData.data.hash}`,
        actionTitle: emailConfirmTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
        text3,
      },
      attachments: attachmentsImages,
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let resetPasswordTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;
    let text4: MaybeType<string>;

    if (i18n) {
      [resetPasswordTitle, text1, text2, text3, text4] = await Promise.all([
        i18n.t('common.resetPassword'),
        i18n.t('reset-password.text1'),
        i18n.t('reset-password.text2'),
        i18n.t('reset-password.text3'),
        i18n.t('reset-password.text4'),
      ]);
    }

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: resetPasswordTitle,
      text: `${this.configService.get('app.frontendDomain', {
        infer: true,
      })}/password-change/${mailData.data.hash} ${resetPasswordTitle}`,
      template: 'reset-password',
      context: {
        title: resetPasswordTitle,
        url: `${this.configService.get('app.frontendDomain', {
          infer: true,
        })}/password-change/${mailData.data.hash}`,
        actionTitle: resetPasswordTitle,
        app_name: this.configService.get('app.name', {
          infer: true,
        }),
        text1,
        text2,
        text3,
        text4,
      },
      attachments: attachmentsImages,
    });
  }

  async sendAttachmentsFiles(
    mailData: MailData<{
      attachments: MailDataAttachment[];
    }>,
  ): Promise<void> {
    const i18n = I18nContext.current();
    let emailTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;
    let text4: MaybeType<string>;

    if (i18n) {
      [emailTitle, text1, text2, text3, text4] = await Promise.all([
        i18n.t('common.sendAttachments'),
        i18n.t('send-attachments.text1'),
        i18n.t('send-attachments.text2'),
        i18n.t('send-attachments.text3'),
        i18n.t('send-attachments.text4'),
      ]);
    }

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: emailTitle,
      text: `${this.configService.get('app.frontendDomain', {
        infer: true,
      })} ${emailTitle}`,
      template: 'send-attachments',
      context: {
        title: emailTitle,
        actionTitle: emailTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
        text3,
        text4,
      },
      attachments: [...mailData.data.attachments, ...attachmentsImages],
    });
  }
}

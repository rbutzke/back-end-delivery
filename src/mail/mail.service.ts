import got from 'got';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from './../common/common.constants';
import { Inject, Injectable } from '@nestjs/common';
import { EmailVars, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    //this.sendEmail('Teste de Envio MailGun', 'Este é um teste de envio mailgun');
  }

  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVars[],
  ) {
    const form = new FormData();
    form.append('from', `Projeto Delivery <mailgun@${this.options.domain}>`);
    form.append('to', 'tcchorussis@gmail.com');
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));
    try {
      await got.post(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email:string, code:string){
      this.sendEmail("Verique seu Email", "verify-email", [
      {key: 'code', value: code},
      {key: 'username', value: email},
    ])
  }
}

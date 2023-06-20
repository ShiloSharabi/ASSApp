import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import * as nestMailer from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const env = process.env;

@Module({
  imports: [
    nestMailer.MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: env.MAIL_ADDRESS, //'flugy.autoservice@gmail.com',
          pass: env.MAIL_PASSWORD, //'ejludqomewtntyws', //'Flugy434343',
        },
      },
      defaults: {
        from: `"No Reply" <${env.MAIL_ADDRESS}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService]
})
export class MailerModule {}

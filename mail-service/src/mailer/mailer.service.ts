import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { MailOptionDto } from './dto/mailOption.dto';
import * as nestMailer from '@nestjs-modules/mailer'
import { json } from 'stream/consumers';
import { HTTP_SATUS_CODE } from 'src/enum/statusCode.enum';

@Injectable()
export class MailerService {

    /**
     * declaring nest servics as a provider
     * @param mailerServics 
     */
    constructor(private readonly mailerServics: nestMailer.MailerService) {}

    /**
     * sanding global mail
     * @param mailOption mail option
     * @param response 
     * @returns 
     */
    public async sendGlobalMail(
        mailOption: MailOptionDto,
        response: Response
    ) {
        try {
            await this.mailerServics.sendMail({
                to: mailOption.sendTo,
                from: 'flugy.autoservice@gmail.com',
                //attachments: [],
                subject: mailOption.subject,
                html: mailOption.body,
            });
            console.log('maile sent');
            return response
                        .status(HTTP_SATUS_CODE.CREATED)
                        .json(
                            { 
                                message: 'maile sent' 
                            }
                        );
        } catch(err) {
            console.error(err);
            return response
                        .status(HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR)
                        .json(
                            { 
                                message: err 
                            }
                        );
        }
    }
}

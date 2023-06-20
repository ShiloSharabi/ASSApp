
import * as axios from 'axios'
import { env } from 'src/configuration/env.configuration'
import { HTTP_SATUS_CODE } from 'src/enum/statusCode.enum';

/**
 * sanding global mail logic
 * @param sendTo list of email id
 * @param subject 
 * @param body http format
 * @returns true if sent else false
 */
export async function sendMail(
    sendTo: string[],
    subject: string,
    body: string,
): Promise<boolean> {
    const url = `htpp://${env.MAIL_HOST}:${env.MAIL_PORT}/api/mailer/send`
    let responseStatus: number = HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR;
    try{
        const response = await axios.default.post(url, {
            sendTo: sendTo,
            subject: subject,
            body: body,
        });
        responseStatus = response.status;
        console.log(response.data);
    } catch(error) {
        console.log(error);
    }
    return responseStatus == HTTP_SATUS_CODE.CREATED ? true : false;
}
import { 
    Body,
    Controller, 
    Post, 
    Res, 
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { MailOptionDto } from './dto/mailOption.dto';
import { MailerService } from './mailer.service';

/**
 * conroller for handling incoming requests for 
 * -sanding global mail
 */
@Controller('mailer')
export class MailerController {
    /**
     * initiate mailerService data member for logic service
     * @param mailerService data member
     */
    constructor(private mailerService: MailerService) {}

    /**
     * EP: http://X.X.X.X:3001/api/mailer/sand
     * EP for sanding mail 
     * @param mailOption mail configuration
     * @param response 
     * @returns 
     */
    @Post('send')
    @UsePipes(new ValidationPipe({ transform: true }))
    async sandMail(
        @Body() mailOption: MailOptionDto,
        @Res() response: Response
    ) {
        return await this.mailerService.sendGlobalMail(mailOption, response);
    }
}

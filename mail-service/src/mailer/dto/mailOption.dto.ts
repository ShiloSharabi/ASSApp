import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsString, Validate } from "class-validator";
import { IsEmailList } from "src/decorator/isEmailList.decorator";
import { IsHTML } from "src/decorator/isHTML.decorator";

/**
 * Mail option configuration
 */
export class MailOptionDto {

    //distribution list
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(0)
    @Validate(IsEmailList, {
        message: 'One or more of the emails are invalid'
    })
    sendTo: string[];

    //mail subject
    @IsNotEmpty()
    @IsString()
    subject: string;

    //mail body
    @IsNotEmpty()
    @Validate(IsHTML, {
        message: 'HTML body is invalid'
    })
    body: string;
}
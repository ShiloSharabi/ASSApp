import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * Organization total profile information
 */
export class OrganizationDto {

    //Organization name
    @IsNotEmpty()
    @IsString()
    name: string;

    //Organization product name 
    @IsNotEmpty()
    @IsString()
    product: string;

    //Organization email address
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
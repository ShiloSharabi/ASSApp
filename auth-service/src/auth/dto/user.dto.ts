import { 
    IsEmail, 
    IsNotEmpty, 
    IsString, 
    Matches, 
    MaxLength, 
    MinLength 
} from "class-validator";

/**
 * Base user class dto
 */
export class UserDto {

    //user email must be a valid email address
    @IsNotEmpty()
    @IsEmail()
    email: string;

    //Password Must Contain: 
    // - 1 Upper Case Letter, 
    // - 1 Lower Case Letter, 
    // - 1 Number Or Special Character
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { 
            message: 'Password Not Valid' 
        }
    )
    password: string;

}
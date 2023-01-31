import { 
    IsNotEmpty, 
    IsString, 
    Validate 
} from "class-validator";
import { IsUserRole } from "src/decorator/isUserRole.decorator";
import { IsValidOrganization } from "src/decorator/isValidOrganization.decorator";
import { USER_ROLE } from "src/enum/userRole.enum";
import { UserDto } from "./user.dto";

/**
 * User total profile information
 */
export class UserInfoDto extends UserDto {

    //user first name
    @IsNotEmpty()
    @IsString()
    firstName: string;

    //user last name
    @IsNotEmpty()
    @IsString()
    lastName: string;

    //user role (validating user role is valid)
    @IsNotEmpty()
    @IsString()
    @Validate(
        IsUserRole, 
        { 
            message: `User role must be one of the following valuesֿֿ: ${Object.values(USER_ROLE)}` 
        }
    )
    role: string;

    @IsNotEmpty()
    @IsString()
    @Validate(
        IsValidOrganization, 
        { 
            message: `Organization not recognized in the system` 
        }
    )
    organization: string | number;
}
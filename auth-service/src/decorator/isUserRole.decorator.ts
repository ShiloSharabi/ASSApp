import { 
    ValidationArguments, 
    ValidatorConstraint, 
    ValidatorConstraintInterface 
} from "class-validator";
import { USER_ROLE } from "src/enum/userRole.enum";

/**
 * custom decorator to validate if user role is valid
 */
@ValidatorConstraint({ name: 'IsUserRole' })
export class IsUserRole implements ValidatorConstraintInterface {

    /**
     * User role validation
     * @param value role to validate
     * @param validationArguments 
     * @returns true if value in USER_ROLE enum else false
     */
    validate(
        value: string = '', 
        validationArguments?: ValidationArguments
    ): boolean | Promise<boolean> {
        const found = value
                        .toLocaleLowerCase()
                        .match(`^${Object.values(USER_ROLE)
                            .filter(v => typeof v !== 'number')
                            .join('|')}$`
                        );
        return found !== undefined 
               && found !== null 
                 ? true 
                 : false;
    }
}
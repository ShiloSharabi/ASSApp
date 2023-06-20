import { 
    ValidationArguments, 
    ValidatorConstraint, 
    ValidatorConstraintInterface 
} from "class-validator";
//import emailvalidator = require("email-validator");
import * as emailvalidator from 'email-validator';

/**
 * custom decorator to validate a list of email address is valid
 */
@ValidatorConstraint({ name: 'IsEmailList' })
export class IsEmailList implements ValidatorConstraintInterface {

    /**
     * Email list validation
     * @param value list of emails 
     * @param validationArguments 
     * @returns true if all values are valid else false
     */
    async validate(
        value: string[], 
        validationArguments?: ValidationArguments
    ): Promise<boolean> {
        for(const val of value) {
            if(!emailvalidator.validate(val)) {
                return false;
            }
        }
        return true;
    }
}
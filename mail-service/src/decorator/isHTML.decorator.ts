import { 
    ValidationArguments, 
    ValidatorConstraint, 
    ValidatorConstraintInterface 
} from "class-validator";
const validator = require('html-validator');
//import * as HTML_Validator from 'html-validator';

/**
 * custom decorator to validate a list of email address is valid
 */
@ValidatorConstraint({ name: 'IsHTML' })
export class IsHTML implements ValidatorConstraintInterface {

    /**
     * HTML body validation
     * @param value string of optional html 
     * @param validationArguments 
     * @returns true if valid HTML string   else false
     */
    async validate(
        value: string[], 
        validationArguments?: ValidationArguments
    ): Promise<boolean> {
        const options = {
            data: value,
            isFragment: true
        };
        try {
            const result = await validator(options);
            if(result.messages.length == 0) {
                return true
            }
            console.log(result);
        } catch (error) {
            console.error(error);
            return false;
        }
        return false;
    }
}
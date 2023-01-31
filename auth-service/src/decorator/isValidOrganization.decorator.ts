import { 
    ValidationArguments, 
    ValidatorConstraint, 
    ValidatorConstraintInterface 
} from "class-validator";
import { query } from "src/db/db";
import { SELECT_QUERY } from "src/db/db-helper.db";
import { ORGANIZATIONS, TABLE, TABLE_COLUMNS } from "src/enum/dbTables.enum";
import { USER_ROLE } from "src/enum/userRole.enum";

/**
 * custom decorator to validate if organization name is valid end exists in the system
 */
@ValidatorConstraint({ name: 'IsValidOrganization' })
export class IsValidOrganization implements ValidatorConstraintInterface {

    /**
     * Organization existence validation
     * @param value organization name 
     * @param validationArguments 
     * @returns true if value is exists organization else false
     */
    async validate(
        value: string = '', 
        validationArguments?: ValidationArguments
    ): Promise<boolean> {
        const found = await query(
                            await SELECT_QUERY(
                                TABLE.ORGANIZATIONS,
                                ['*'],
                                [
                                    { 
                                        col: ORGANIZATIONS.ORG_NAME, 
                                        operand: '=', 
                                        value: value 
                                    },
                                    {
                                        col: ORGANIZATIONS.APPROVED,
                                        operand: '=',
                                        value: 'true'
                                    }
                                ], null, null), []);

        return found !== undefined 
               && found !== null 
               && found.length != 0
                 ? true 
                 : false;
    }
}
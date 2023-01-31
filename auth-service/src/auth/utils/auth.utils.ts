import { UserInfoDto } from "../dto/userInfo.dto";
import * as bcrypt from 'bcrypt';
import { query } from 'src/db/db';
import { INSERT_QUERY, SELECT_QUERY } from 'src/db/db-helper.db';
import { ORGANIZATIONS, TABLE, USERS } from 'src/enum/dbTables.enum';
import { GET_VALUE_LIST_TO_SET } from 'src/utils/global.utils';
/**
 * building a user
 * @param email 
 * @param password 
 * @param firstName 
 * @param lastName 
 * @param role 
 * @param organization 
 * @returns 
 */
export async function BUILD_USER(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    organization: string
): Promise<UserInfoDto> {
    const userInfo: UserInfoDto = new UserInfoDto();
    userInfo.email = email;
    userInfo.password = password;
    userInfo.firstName = firstName;
    userInfo.lastName = lastName;
    userInfo.role = role;
    userInfo.organization = organization;

    return userInfo;
}

export async function CREATE_USER(        
    userInfo: UserInfoDto,
    isApproved: boolean,
): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);
    userInfo.password = hashedPassword;
    userInfo.organization = (await query(
        await SELECT_QUERY(
            TABLE.ORGANIZATIONS,
            [ORGANIZATIONS.ID],
            [{ col: ORGANIZATIONS.ORG_NAME, operand: '=', value: userInfo.organization.toString() }], null, null), []))[0].id;
    userInfo.email = userInfo.email.toLowerCase();
    let valuesToSet: any[][] = await GET_VALUE_LIST_TO_SET(userInfo, [isApproved]);
    let columnsToSet: string[] = Object.values(USERS);
    await query(await INSERT_QUERY(TABLE.USERS, columnsToSet.slice(1, columnsToSet.length), valuesToSet), []);
}
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { HTTP_SATUS_CODE } from 'src/enum/statusCode.enum';
import { UserInfoDto } from './dto/userInfo.dto';
import * as bcrypt from 'bcrypt';
import { query } from 'src/db/db';
import { DELETE_QUERY, INSERT_QUERY, SELECT_QUERY, UPDATE_QUERY } from 'src/db/db-helper.db';
import { ORGANIZATIONS, TABLE, TABLE_COLUMNS, TABLE_PK, USERS } from 'src/enum/dbTables.enum';
import { OrganizationDto } from './dto/organization.dto';
import { GET_VALUE_LIST_TO_SET } from 'src/utils/global.utils';
import { BUILD_USER, CREATE_USER } from './utils/auth.utils';
import { USER_ROLE } from 'src/enum/userRole.enum';
import { userInfo } from 'os';
import { UserDto } from './dto/user.dto';
import { JWTPayload } from './jwt/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    /**
     * initilazing jwt service object
     * @param jwtService 
     */
    constructor(private jwtService: JwtService) {}

    /**
     * retrive 'Hello Auth Service' for validate service
     * @param response 
     * @returns 
     */
    public async getHelloAuthService(
        response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        const x = await query('select * from organizations', []);
        const y = await query('select * from users', []);
        return response
                    .status(HTTP_SATUS_CODE.OK)
                    .json(
                    { 
                        message: 'Hello Auth Service' ,
                        value: {x: x, y: y}
                    }
                );
    }

    /**
     * create new organization in the system
     * @param organizationInfo organization details
     * @param response 
     * @returns 
     */
    public async organizationRegister(
        organizationInfo: OrganizationDto,
        response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        try {
            let valuesToSet: any[][] = await GET_VALUE_LIST_TO_SET(organizationInfo, [false]);
            let columnsToSet: string[] = Object.values(ORGANIZATIONS);
            await query(await INSERT_QUERY(TABLE.ORGANIZATIONS, columnsToSet.slice(1, columnsToSet.length), valuesToSet), []);

            //Send an email to appraval for appMenager

            //create logs
            return response
                        .status(HTTP_SATUS_CODE.CREATED)
                        .json(
                            {
                                message: 'Organization created successfully! need to be approved be super maneger system'
                            }
                        );
        } catch(err) {
            console.error(err);
            return response
                        .status(HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR)
                        .json(
                            {
                                message: err
                            }
                        );
        }
    }

    /**
     * Approve or decline an organization
     * @param orgID 
     * @param isApproved true if to aproove false if decline
     * @param response 
     * @returns 
     */
    public async organizationRegisterApproveOrDecline(
        orgID: number,
        isApproved: boolean,
        response: Response,
    ) {
        try {
            let message: string;
            if(isApproved) {
                await query(await UPDATE_QUERY(
                    TABLE.ORGANIZATIONS, 
                    [ORGANIZATIONS.APPROVED], 
                    ['true'], 
                    [
                        { 
                            col: TABLE_PK.ORGANIZATIONS, 
                            operand: '=', 
                            value: orgID.toString() 
                        }
                    ]), []);
                message = 'approved';

                //create admin user
                const orgInfo = (await query(
                    await SELECT_QUERY(
                        TABLE.ORGANIZATIONS,
                        ['*'],
                        [
                            { 
                                col: ORGANIZATIONS.ID, 
                                operand: '=', 
                                value: orgID.toString() 
                            }
                        ], null, null), []))[0];
                const adminUser = await BUILD_USER(
                    orgInfo.org_email,
                    `Aa${orgInfo.org_name}998877`,
                    orgInfo.org_name,
                    orgInfo.org_product,
                    USER_ROLE.ADMIN,
                    orgInfo.org_name,
                );
                await CREATE_USER(adminUser, true);
                //Send an email to inform approval
            } else {
                await query(await DELETE_QUERY(
                    TABLE.ORGANIZATIONS, 
                    [
                        { 
                            col: TABLE_PK.ORGANIZATIONS, 
                            operand: '=', 
                            value: orgID.toString() 
                        }]), []);
                message = 'deleted';
                //Send an email to inform rejection
            }

            //create logs
            console.log(`Organization ${message} successfully!`);
            return response
                        .status(HTTP_SATUS_CODE.CREATED)
                        .json(
                            {
                                message: `Organization ${message} successfully!`
                            }
                        );
        } catch(err) {
            console.error(err);
            return response
                        .status(HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR)
                        .json(
                            {
                                message: err
                            }
                        );
        }
    }

    /**
     * logic for new user registeration
     * @param userInfo new user details
     * @param response 
     * @returns 
     */
    public async userRegister(
        userInfo: UserInfoDto,
        isApproved: boolean,
        response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        try {
            await CREATE_USER(userInfo, isApproved);

            //Send an email to appraval for admin in the same organization

            //create logs
            return response
                        .status(HTTP_SATUS_CODE.CREATED)
                        .json(
                            { 
                                message: 'User created successfully!' 
                            }
                        );
        } catch(err) {
            console.error(err);
            return response
                        .status(HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR)
                        .json(
                            { 
                                message: err 
                            }
                        );
        }
    }

    /**
     * approve or decline a user 
     * @param userID 
     * @param isApproved 
     * @param response 
     * @returns 
     */
    public async userApproveOrDecline(
        userID: number,
        isApproved: boolean,
        response: Response,
    ) {
        try {
            if(userID == 1) {
                return response.status(HTTP_SATUS_CODE.NOT_ACCEPTABLE).json({
                    message: 'Not Acceptable',
                })
            }
            let message: string;
            if(isApproved) {
                await query(await UPDATE_QUERY(
                    TABLE.USERS, 
                    [USERS.APPROVED], 
                    ['true'], 
                    [
                        { 
                            col: TABLE_PK.USERS, 
                            operand: '=', 
                            value: userID.toString() 
                        },
                    ]), []);
                message = 'approved';
                //Send an email to inform approval
            } else {
                await query(await DELETE_QUERY(
                    TABLE.USERS, 
                    [
                        { 
                            col: TABLE_PK.USERS, 
                            operand: '=', 
                            value: userID.toString() 
                        },
                    ]), []);
                message = 'deleted';
                //Send an email to inform rejection
            }

            //create logs
            console.log(`User ${message} successfully!`);
            return response
                        .status(HTTP_SATUS_CODE.CREATED)
                        .json(
                            {
                                message: `User ${message} successfully!`
                            }
                        );
        } catch(err) {
            console.error(err);
            return response
                        .status(HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR)
                        .json(
                            {
                                message: err
                            }
                        );
        }
    }

    /**
     * user signin 
     * @param user user email and password
     * @param response 
     * @returns 
     */
    public async userSignin(
        user: UserDto,
        response: Response,
    ) {
        try {
            const userFound = (await query(
                await SELECT_QUERY(
                    TABLE.USERS,
                    ['*'],
                    [
                        { 
                            col: USERS.USER_EMAIL, 
                            operand: '=', 
                            value: user.email.toLowerCase()
                        },
                        { 
                            col: USERS.APPROVED, 
                            operand: '=', 
                            value: 'true'
                        },
                    ], null, null), []))[0];

            if(await bcrypt.compare(user.password, userFound.user_password)) {
                const jwtPayload: JWTPayload = {
                    email: userFound.user_email,
                }
                const accessToken: string = this.jwtService.sign(jwtPayload);
                return response
                            .status(HTTP_SATUS_CODE.OK)
                            .json({
                                userInfo: {
                                    email: userFound.user_email,
                                    firstName: userFound.user_first_name,
                                    lastName: userFound.user_last_name,
                                    role: userFound.user_role,
                                    organization: userFound.user_org
                                },
                                accessToken: accessToken,
                            })
            } else {
                return response
                            .status(HTTP_SATUS_CODE.NOT_FOUND)
                            .json({
                                message: 'User password or email incorrect'
                            })
            }
        } catch(err) {
            console.error(err);
            return response
                        .status(HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR)
                        .json(
                            { 
                                message: err 
                            }
                        );
        }
    }
}

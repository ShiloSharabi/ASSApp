
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { query } from 'src/db/db';
import { SELECT_QUERY } from 'src/db/db-helper.db';
import { TABLE, USERS } from 'src/enum/dbTables.enum';
import { JWTPayload } from './jwt-payload.interface';

/**
 * building the jwt for all users to verify that the user is who they claim to be
 */
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {

    /**
     * constructing jwt strategy class
     */
    constructor() {
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    /**
     * validate user
     * @param payload user email 
     * @returns jwt if exists else unauthorixed exception
     */
    async validate(
        payload: JWTPayload
    ) {
        const user = (await query(
            await SELECT_QUERY(
                TABLE.USERS,
                ['*'],
                [
                    { 
                        col: USERS.USER_EMAIL, 
                        operand: '=', 
                        value: payload.email.toLowerCase(),
                    }
                ], null, null), []));
        if(user.length == 0) {
            throw new UnauthorizedException();
        }

        return user[0];
    }
}
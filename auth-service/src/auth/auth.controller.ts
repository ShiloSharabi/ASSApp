import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    Put, 
    Res, 
    UseGuards, 
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { OrganizationDto } from './dto/organization.dto';
import { UserDto } from './dto/user.dto';
import { UserInfoDto } from './dto/userInfo.dto';
import { IsAdmin } from './gurard/isAdmin.guard';

/**
 * conroller for handling incoming requests for 
 * -Organization registeration
 * -Signup
 * -Signin
 * -Reset password (request and reset)
 */
@Controller('auth')
//@UseGuards(AuthGuard())
export class AuthController {

    /**
     * initiate authService data member for logic service
     * @param authService - data memmber
     */
    constructor(private authService: AuthService) {}

    @Get('')
    async helloAuthService(
        @Res() response: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.authService.getHelloAuthService(response);
    }

    /**
     * EP: http://X.X.X.X:3000/api/auth/organization/on-board
     * EP for new organization registeration 
     * @param organizationInfo new organization information
     * @param response 
     * @returns 
     */
    @Post('organization/on-board')
    @UsePipes(new ValidationPipe({ transform: true }))
    async organizationOnBoard(
        @Body() organizationInfo: OrganizationDto,
        @Res() response: Response,
    ) {
        return await this.authService.organizationRegister(organizationInfo, response);
    }

    /**
     * EP: http://X.X.X.X:3000/api/auth/organization/on-board/approval/:org_id/:is_approved
     * EP for new organization registeration 
     * @param org_id 
     * @param is_approved 
     * @param response 
     * @returns 
     */
    @Put('organization/on-board/approval/:org_id/:is_approved')
    //@UseGuards(IsAdmin)
    @UsePipes(new ValidationPipe({ transform: true }))
    async organizationOnBoardApproval(
        @Param('org_id') org_id: number,
        @Param('is_approved') is_approved: boolean,
        @Res() response: Response,
    ) {
        return await this.authService.organizationRegisterApproveOrDecline(org_id, is_approved, response);
    }

    /**
     * EP: http://X.X.X.X:3000/api/auth/signup
     * EP for new user registeration 
     * @param userInfo new user information
     * @param response 
     * @returns 
     */
    @Post('signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signup(
        @Body() userInfo: UserInfoDto,
        @Res() response: Response,
    ) {
        return await this.authService.userRegister(userInfo, false, response);
    }

    /**
     * EP: http://X.X.X.X:3000/api/auth/user/approval/:user_id/:is_approved
     * EP for new organization registeration 
     * @param user_id 
     * @param is_approved 
     * @param response 
     * @returns 
     */
    @Put('user/approval/:user_id/:is_approved')
    //@UseGuards(IsAdmin)
    @UsePipes(new ValidationPipe({ transform: true }))
    async userApproval(
        @Param('user_id') user_id: number,
        @Param('is_approved') is_approved: boolean,
        @Res() response: Response,
    ) {
        return await this.authService.userApproveOrDecline(user_id, is_approved, response);
    }

    /**
     * EP: http://X.X.X.X:3000/api/auth/signin
     * EP for user signin
     * @param user email and password
     * @param response 
     * @returns 
     */
    @Post('signin')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signin(
        @Body() user: UserDto,
        @Res() response: Response,
    ) {
        return await this.authService.userSignin(user, response);
    }
}

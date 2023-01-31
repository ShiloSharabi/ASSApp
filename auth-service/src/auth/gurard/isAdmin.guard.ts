import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { USER_ROLE } from "src/enum/userRole.enum";

/**
 * guard for validating if user is admin or not
 */
@Injectable()
export class IsAdmin implements CanActivate {

    /**
     * validating if user is got admin role
     * @param context 
     * @returns true if admin else false
     */
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        if(req.user != undefined && req.user != null) {
            console.log(req.user);
            if(req.user.user_role.toLowerCase() == USER_ROLE.ADMIN.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

}
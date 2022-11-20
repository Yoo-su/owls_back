import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(user_email: string, user_password: string): Promise<import("../user/entity/user.entity").User>;
}
export {};

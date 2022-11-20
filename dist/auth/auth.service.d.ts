import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(user_email: string, user_password: string): Promise<import("../user/entity/user.entity").User>;
    login(user: any): Promise<any>;
}

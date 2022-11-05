import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(user_email: string, user_password: string) {
        const user = await this.userService.findOne(user_email);
        if (user && user.user_password === user_password) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { user_email: user.user_email };

        return {
            success: true,
            access_token: this.jwtService.sign(payload)
        }
    }
}

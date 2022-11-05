import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import ValidateUserDto from './dto/validate-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/signin')
    async signin(@Request() req: any) {
        return await this.authService.login(req.user);
    }
}

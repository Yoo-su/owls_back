import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from "./dto";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get("/all")
    async getAllUsers() {
        const res = await this.userService.findAll();
        console.log(res)
    }

    @Post("/signup")
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }
}

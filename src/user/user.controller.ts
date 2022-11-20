import { Controller, Post, Body, Get, Query } from '@nestjs/common';
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

    @Get("/profile")
    async getUserProfile(@Query('user_id') user_id: number) {
        return this.userService.getProfile(user_id);
    }
}

import { IsEmail, IsString } from 'class-validator';

export default class CreateUserDto {
    @IsString()
    user_name: string;

    @IsEmail()
    user_email: string;

    @IsString()
    user_password: string;
}
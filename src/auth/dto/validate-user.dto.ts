import { IsEmail, IsString } from 'class-validator';

export default class ValidateUserDto {
    @IsEmail()
    user_email: string;

    @IsString()
    user_password: string;
}
import { IsString, IsNumber, } from 'class-validator';

export default class CreatePostDto {
    @IsString()
    post_text: string;

    @IsString()
    post_image: string;

    @IsString()
    post_date: string;

    @IsNumber()
    post_user: number;
}
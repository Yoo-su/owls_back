import { IsString } from 'class-validator';

export default class CreatePostDto {
    @IsString()
    post_text: string;

    @IsString()
    post_image: string;

    @IsString()
    post_date: string;

    @IsString()
    post_user: string;
}
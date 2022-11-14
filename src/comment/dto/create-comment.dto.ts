import { IsString, IsNumber } from 'class-validator';

export default class CreateCommentDto {
    @IsString()
    comment_text: string;

    @IsString()
    comment_date: string;

    @IsString()
    comment_user: string;

    @IsNumber()
    comment_post: number;
}
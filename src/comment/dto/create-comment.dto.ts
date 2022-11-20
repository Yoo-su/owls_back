import { IsString, IsNumber } from 'class-validator';

export default class CreateCommentDto {
    @IsString()
    comment_text: string;

    @IsString()
    comment_date: string;

    @IsNumber()
    comment_user: number;

    @IsNumber()
    comment_post: number;
}
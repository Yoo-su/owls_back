import { IsString, IsNumber } from 'class-validator';

export default class CreateFriendDto {
    @IsNumber()
    friend_source: number;

    @IsNumber()
    friend_target: number;

    @IsString()
    created_date: string;
}
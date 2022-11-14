import { IsString } from 'class-validator';

export default class CreateFriendDto {
    @IsString()
    friend_source: string;

    @IsString()
    friend_target: string;

    @IsString()
    created_date: string;
}
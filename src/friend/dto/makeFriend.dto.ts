import { IsNumber, IsString } from 'class-validator';

export default class MakeFriendDto {
    @IsNumber()
    friend_id: number;

    @IsString()
    updated_date: string;
}
import { DataSource, Repository } from 'typeorm';
import MakeFriendDto from './dto/makeFriend.dto';
import CreateFriendDto from './dto/createFriend.entity';
import { Friend } from './entity/friend.entity';
export declare class FriendService {
    private friendRepository;
    private dataSource;
    constructor(friendRepository: Repository<Friend>, dataSource: DataSource);
    getFriend(friend_id: number): Promise<any>;
    getFriends(user_id: number): Promise<any>;
    createFriend(createFriendDto: CreateFriendDto): Promise<Friend | {
        success: boolean;
        message: string;
    }>;
    makeFriend(makeFriendDto: MakeFriendDto): Promise<any>;
    deleteFriend(friend_id: number): Promise<import("typeorm").DeleteResult>;
    getFriendRequests(friend_target: number): Promise<any>;
    getUserRequests(user_id: number): Promise<any>;
}

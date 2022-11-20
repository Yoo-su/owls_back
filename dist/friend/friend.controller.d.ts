import MakeFriendDto from './dto/makeFriend.dto';
import CreateFriendDto from './dto/createFriend.entity';
import { FriendService } from './friend.service';
export declare class FriendController {
    private friendService;
    constructor(friendService: FriendService);
    createFriend(createFriendDto: CreateFriendDto): Promise<import("./entity/friend.entity").Friend | {
        success: boolean;
        message: string;
    }>;
    makeFriend(makeFriendDto: MakeFriendDto): Promise<any>;
    deleteFriend(friend_id: number): Promise<import("typeorm").DeleteResult>;
    getFriendsList(user_id: number): Promise<any>;
    getFriendRequestsList(friend_target: number): Promise<any>;
    getUserRequests(user_id: number): Promise<any>;
}

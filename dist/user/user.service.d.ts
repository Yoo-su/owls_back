import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto';
import { PostService } from 'src/post/post.service';
import { FriendService } from 'src/friend/friend.service';
export declare class UserService {
    private usersRepository;
    private postService;
    private friendService;
    constructor(usersRepository: Repository<User>, postService: PostService, friendService: FriendService);
    findOne(user_email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        msg: string;
    }>;
    getProfile(user_id: number): Promise<{
        user: {
            user_nickname: string;
            user_avatar: string;
            user_name: string;
            user_email: string;
            user_id: number;
        };
        friends: any;
        posts: any;
    }>;
}

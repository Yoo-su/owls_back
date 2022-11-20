import { UserService } from './user.service';
import { CreateUserDto } from "./dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        msg: string;
    }>;
    getUserProfile(user_id: number): Promise<{
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

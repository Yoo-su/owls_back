import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto';
import { PostService } from 'src/post/post.service';
import { FriendService } from 'src/friend/friend.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private postService: PostService,
        private friendService: FriendService,
    ) { }

    async findOne(user_email: string): Promise<User | null> {
        try {
            return await this.usersRepository.findOne({ where: { user_email: user_email } });
        } catch (err) {
            throw err;
        }

    }

    async findAll(): Promise<User[]> {
        try {
            return await this.usersRepository.find();
        } catch (err) {
            throw err;
        }

    }

    async create(createUserDto: CreateUserDto) {
        try {
            const { user_name, user_nickname, user_email, user_password } = createUserDto;
            const isEmailExist = await this.usersRepository.findOne({ where: { user_email: user_email } });
            const isNicknameExist = await this.usersRepository.findOne({ where: { user_nickname: user_nickname } });
            if (isEmailExist) {
                return {
                    success: false,
                    msg: "이미 존재하는 이메일입니다"
                }
            }
            if (isNicknameExist) {
                return {
                    success: false,
                    msg: "이미 존재하는 닉네임입니다"
                }
            }

            const instance = this.usersRepository.create({
                ...createUserDto
            })
            await this.usersRepository.save(instance);
            return {
                success: true,
                msg: "회원 가입이 완료되었습니다"
            }
        } catch (err) {
            throw err;
        }
    }

    async getProfile(user_id: number) {
        const user = await this.usersRepository.findOne({ where: { user_id } });
        const friends = await this.friendService.getFriends(user_id);
        const posts = await this.postService.getUserPosts(user_id);

        return {
            user: {
                user_nickname: user.user_nickname,
                user_avatar: user.user_avatar,
                user_name: user.user_name,
                user_email: user.user_email,
                user_id: user.user_id,
            },
            friends,
            posts,
        }
    }
}

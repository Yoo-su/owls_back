import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import MakeFriendDto from './dto/makeFriend.dto';
import CreateFriendDto from './dto/createFriend.entity';
import { Friend } from './entity/friend.entity';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private friendRepository: Repository<Friend>,
        @InjectDataSource()
        private dataSource: DataSource,
    ) { }

    async getFriends(friend_target: string) {
        const res = await this.dataSource.query(`
            select friend_id, user_email, user_avatar, user_nickname from friends join users on friend_source=user_email where friend_target="${friend_target}" and updated_date IS NOT NULL;
        `)
        return res;
    }

    async createFriend(createFriendDto: CreateFriendDto) {
        try {
            const instance = this.friendRepository.create({
                ...createFriendDto
            })
            const res = await this.friendRepository.save(instance);

            return res;
        } catch (err) {
            throw err
        }
    }

    async makeFriend(makeFriendDto: MakeFriendDto) {
        try {
            const { friend_id, updated_date } = makeFriendDto;
            const res = await this.friendRepository.update(friend_id, {
                updated_date: updated_date
            });

            return res;
        } catch (err) {
            throw err;
        }
    }

    async deleteFriend(friend_id: number) {
        try {
            const res = await this.friendRepository.delete(friend_id);
            return res;
        } catch (err) {
            throw err;
        }
    }

    async getFriendRequests(friend_target: string) {
        try {
            const res = await this.dataSource.query(`
                SELECT friend_id, user_email, user_avatar, user_nickname from friends join users on friend_source=user_email where friend_target="${friend_target}" and updated_date IS NULL; 
            `)

            return res;
        } catch (err) {
            throw err
        }
    }
}

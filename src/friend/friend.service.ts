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

    async getFriend(friend_id: number) {
        const res = await this.dataSource.query(`
            select friend_id, created_date, updated_date, user_email, user_avatar, user_nickname from friends join users on friend_source=user_email 
            where friend_id=${friend_id} and updated_date IS NOT NULL;
        `);
        return res[0];
    }

    async getFriends(user_email: string) {
        const rows1 = await this.dataSource.query(`
            select friend_id, created_date, updated_date, user_email, user_avatar, user_nickname from friends join users on friend_source=user_email 
            where friend_target="${user_email}" and updated_date IS NOT NULL;
        `)

        const rows2 = await this.dataSource.query(`
            select friend_id, created_date, updated_date, user_email, user_avatar, user_nickname from friends join users on friend_target=user_email 
            where friend_source="${user_email}" and updated_date IS NOT NULL;
        `)


        return rows1.concat(rows2);
    }

    async createFriend(createFriendDto: CreateFriendDto) {
        try {
            const { friend_source, friend_target } = createFriendDto;
            const entity = await this.friendRepository.findOne({
                where: {
                    friend_source,
                    friend_target
                }
            });

            //이미 존재하는 경우
            if (entity) {
                let message: string;
                entity.updated_date ? message = "이미 친구로 등록된 사용자입니다" : message = "이미 친구요청을 보냈습니다";
                return {
                    success: false,
                    message
                }
            }
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

            return await this.getFriend(friend_id);
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

    async getUserRequests(user_email: string) {
        try {
            const res = await this.dataSource.query(`
                select friend_id, created_date, user_email, user_avatar, user_nickname from friends join users on friend_target=user_email where friend_source="${user_email}" and updated_date is NULL;
            `);

            return res;
        } catch (err) {
            throw err;
        }
    }
}

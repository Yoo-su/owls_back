"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const friend_entity_1 = require("./entity/friend.entity");
let FriendService = class FriendService {
    constructor(friendRepository, dataSource) {
        this.friendRepository = friendRepository;
        this.dataSource = dataSource;
    }
    async getFriend(friend_id) {
        const res = await this.dataSource.query(`
            select friend_id, created_date, updated_date, user_id, user_email, user_avatar, user_nickname from friends join users on friend_source=user_id 
            where friend_id=${friend_id} and updated_date IS NOT NULL;
        `);
        return res[0];
    }
    async getFriends(user_id) {
        const rows1 = await this.dataSource.query(`
            select friend_id, created_date, updated_date, user_id, user_email, user_avatar, user_nickname from friends join users on friend_source=user_id 
            where friend_target="${user_id}" and updated_date IS NOT NULL;
        `);
        const rows2 = await this.dataSource.query(`
            select friend_id, created_date, updated_date, user_id, user_email, user_avatar, user_nickname from friends join users on friend_target=user_id 
            where friend_source="${user_id}" and updated_date IS NOT NULL;
        `);
        return rows1.concat(rows2);
    }
    async createFriend(createFriendDto) {
        try {
            const { friend_source, friend_target } = createFriendDto;
            const entity = await this.friendRepository.findOne({
                where: {
                    friend_source,
                    friend_target
                }
            });
            if (entity) {
                let message;
                entity.updated_date ? message = "이미 친구로 등록된 사용자입니다" : message = "이미 친구요청을 보냈습니다";
                return {
                    success: false,
                    message
                };
            }
            const instance = this.friendRepository.create(Object.assign({}, createFriendDto));
            const res = await this.friendRepository.save(instance);
            return res;
        }
        catch (err) {
            throw err;
        }
    }
    async makeFriend(makeFriendDto) {
        try {
            const { friend_id, updated_date } = makeFriendDto;
            const res = await this.friendRepository.update(friend_id, {
                updated_date: updated_date
            });
            return await this.getFriend(friend_id);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteFriend(friend_id) {
        try {
            const res = await this.friendRepository.delete(friend_id);
            return res;
        }
        catch (err) {
            throw err;
        }
    }
    async getFriendRequests(friend_target) {
        try {
            const res = await this.dataSource.query(`
                SELECT friend_id, user_id, user_email, user_avatar, user_nickname from friends join users on friend_source=user_id where friend_target="${friend_target}" and updated_date IS NULL; 
            `);
            return res;
        }
        catch (err) {
            throw err;
        }
    }
    async getUserRequests(user_id) {
        try {
            const res = await this.dataSource.query(`
                select friend_id, created_date, user_id, user_email, user_avatar, user_nickname from friends join users on friend_target=user_id where friend_source="${user_id}" and updated_date is NULL;
            `);
            return res;
        }
        catch (err) {
            throw err;
        }
    }
};
FriendService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(friend_entity_1.Friend)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], FriendService);
exports.FriendService = FriendService;
//# sourceMappingURL=friend.service.js.map
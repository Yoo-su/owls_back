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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const post_service_1 = require("../post/post.service");
const friend_service_1 = require("../friend/friend.service");
let UserService = class UserService {
    constructor(usersRepository, postService, friendService) {
        this.usersRepository = usersRepository;
        this.postService = postService;
        this.friendService = friendService;
    }
    async findOne(user_email) {
        try {
            return await this.usersRepository.findOne({ where: { user_email: user_email } });
        }
        catch (err) {
            throw err;
        }
    }
    async findAll() {
        try {
            return await this.usersRepository.find();
        }
        catch (err) {
            throw err;
        }
    }
    async create(createUserDto) {
        try {
            const { user_name, user_nickname, user_email, user_password } = createUserDto;
            const isEmailExist = await this.usersRepository.findOne({ where: { user_email: user_email } });
            const isNicknameExist = await this.usersRepository.findOne({ where: { user_nickname: user_nickname } });
            if (isEmailExist) {
                return {
                    success: false,
                    msg: "이미 존재하는 이메일입니다"
                };
            }
            if (isNicknameExist) {
                return {
                    success: false,
                    msg: "이미 존재하는 닉네임입니다"
                };
            }
            const instance = this.usersRepository.create(Object.assign({}, createUserDto));
            await this.usersRepository.save(instance);
            return {
                success: true,
                msg: "회원 가입이 완료되었습니다"
            };
        }
        catch (err) {
            throw err;
        }
    }
    async getProfile(user_id) {
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
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        post_service_1.PostService,
        friend_service_1.FriendService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
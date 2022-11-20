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
exports.FriendController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const makeFriend_dto_1 = require("./dto/makeFriend.dto");
const createFriend_entity_1 = require("./dto/createFriend.entity");
const friend_service_1 = require("./friend.service");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    createFriend(createFriendDto) {
        return this.friendService.createFriend(createFriendDto);
    }
    makeFriend(makeFriendDto) {
        return this.friendService.makeFriend(makeFriendDto);
    }
    deleteFriend(friend_id) {
        return this.friendService.deleteFriend(friend_id);
    }
    getFriendsList(user_id) {
        return this.friendService.getFriends(user_id);
    }
    getFriendRequestsList(friend_target) {
        return this.friendService.getFriendRequests(friend_target);
    }
    getUserRequests(user_id) {
        return this.friendService.getUserRequests(user_id);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createFriend_entity_1.default]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "createFriend", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('/make'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [makeFriend_dto_1.default]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "makeFriend", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Body)('friend_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "deleteFriend", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "getFriendsList", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('/request-list'),
    __param(0, (0, common_1.Query)('friend_target')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "getFriendRequestsList", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('/my-requests'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "getUserRequests", null);
FriendController = __decorate([
    (0, common_1.Controller)('friend'),
    __metadata("design:paramtypes", [friend_service_1.FriendService])
], FriendController);
exports.FriendController = FriendController;
//# sourceMappingURL=friend.controller.js.map
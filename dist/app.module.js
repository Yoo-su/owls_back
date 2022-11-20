"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/entity/user.entity");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const post_module_1 = require("./post/post.module");
const post_entity_1 = require("./post/entity/post.entity");
const comment_module_1 = require("./comment/comment.module");
const comment_entity_1 = require("./comment/entity/comment.entity");
const friend_module_1 = require("./friend/friend.module");
const friend_entity_1 = require("./friend/entity/friend.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: 3306,
                username: 'root',
                password: process.env.DB_PW,
                database: 'owls',
                entities: [user_entity_1.User, post_entity_1.Post, comment_entity_1.Comment, friend_entity_1.Friend],
                synchronize: false,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            post_module_1.PostModule,
            comment_module_1.CommentModule,
            friend_module_1.FriendModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const storage_1 = require("@google-cloud/storage");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entity/post.entity");
let PostService = class PostService {
    constructor(postRepository, dataSource, configService) {
        this.postRepository = postRepository;
        this.dataSource = dataSource;
        this.configService = configService;
        this.storage = new storage_1.Storage({
            projectId: configService.get("PROJECT_ID"),
            credentials: {
                client_email: configService.get("CLIENT_EMAIL"),
                private_key: configService.get("PRIVATE_KEY").replace(/\\n/g, '\n')
            }
        });
        this.bucket = this.storage.bucket("owls_image_bucket");
    }
    async createPost(createPostDto) {
        try {
            const instance = this.postRepository.create(Object.assign({}, createPostDto));
            await this.postRepository.save(instance);
            return await this.getAllPosts();
        }
        catch (err) {
            throw err;
        }
    }
    async deletePost(post_id) {
        try {
            const entity = await this.postRepository.findOne({ where: { post_id } });
            if (entity.post_image) {
                const path = entity.post_image.split("/").at(-1);
                const res = await this.deleteStorageFile(path);
            }
            await this.dataSource.query(`
                delete from comments where comment_post=${post_id};
            `);
            await this.postRepository.delete(post_id);
            return;
        }
        catch (err) {
            throw err;
        }
    }
    createStorageFile(file) {
        return new Promise((resolve, reject) => {
            const blob = this.bucket.file(file.originalname);
            const blobStream = blob.createWriteStream();
            blobStream.on("finish", () => {
                resolve(true);
            });
            blobStream.end(file.buffer);
        });
    }
    async deleteStorageFile(path) {
        const res = await this.storage
            .bucket("owls_image_bucket")
            .file(path)
            .delete({ ignoreNotFound: true });
        return res;
    }
    async getAllPosts() {
        try {
            const posts = await this.dataSource.query(`
                select post_id, post_text, post_image, post_date, user_id, user_email, user_avatar, user_name, user_nickname from posts join users on post_user=user_id order by post_id desc;
            `);
            return posts;
        }
        catch (err) {
            throw err;
        }
    }
    async getFriendsPosts(user_id) {
        try {
            const result = await this.dataSource.query(`
                select post_id, post_text, post_image, post_date, user_id, user_email, user_avatar, user_name, user_nickname from posts join users on post_user=user_id where post_user in (select friend_source as id from friends where friend_target="${user_id}" and updated_date IS NOT NULL union select friend_target as id from friends where friend_source="${user_id}" and updated_date IS NOT NULL);
            `);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getUserPosts(user_id) {
        try {
            return await this.dataSource.query(`
            select post_id, post_text, post_image, post_date, user_id, user_email, user_avatar, user_name, user_nickname from posts join users on post_user=user_id where post_user=${user_id} order by post_id desc;
            `);
        }
        catch (err) {
            throw err;
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        config_1.ConfigService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map
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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entity/comment.entity");
let CommentService = class CommentService {
    constructor(commentRepository, dataSource) {
        this.commentRepository = commentRepository;
        this.dataSource = dataSource;
    }
    async createComment(createCommentDto) {
        try {
            const instance = this.commentRepository.create(Object.assign({}, createCommentDto));
            const newEntity = await this.commentRepository.save(instance);
            return await this.getComments(newEntity.comment_post);
        }
        catch (err) {
            throw err;
        }
    }
    async getComments(postId) {
        try {
            return await this.dataSource.query(`
            select comment_id, comment_text, comment_date, user_id, user_email, user_avatar, user_nickname from comments join posts on comment_post=post_id join users on comment_user=user_id where comment_post=${postId} order by comment_id desc; 
            `);
        }
        catch (err) {
            throw err;
        }
    }
    async deleteComment(comment_id) {
        try {
            const result = await this.commentRepository.delete(comment_id);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map
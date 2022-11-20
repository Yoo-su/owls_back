import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import CreateCommentDto from './dto/create-comment.dto';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectDataSource()
        private dataSource: DataSource,
    ) { }

    async createComment(createCommentDto: CreateCommentDto) {
        try {
            const instance = this.commentRepository.create({
                ...createCommentDto
            })
            const newEntity = await this.commentRepository.save(instance);
            return await this.getComments(newEntity.comment_post)
        } catch (err) {
            throw err
        }
    }

    async getComments(postId: number) {
        try {
            return await this.dataSource.query(`
            select comment_id, comment_text, comment_date, user_id, user_email, user_avatar, user_nickname from comments join posts on comment_post=post_id join users on comment_user=user_id where comment_post=${postId} order by comment_id desc; 
            `)
        } catch (err) {
            throw err
        }
    }

    async deleteComment(comment_id: number) {
        try {
            const result = await this.commentRepository.delete(comment_id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

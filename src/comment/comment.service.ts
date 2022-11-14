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
            const result = await this.dataSource.query(`
                select comment_id, comment_text, comment_date, user_email, user_avatar, user_nickname from comments join posts on comment_post=post_id join users on comment_user=user_email where comment_id=${newEntity.comment_id}; 
            `);
            return result;
        } catch (err) {
            throw err
        }
    }

    async getComments(postId: number) {
        try {
            const comments = await this.dataSource.query(`
            select comment_id, comment_text, comment_date, user_email, user_avatar, user_nickname from comments join posts on comment_post=post_id join users on comment_user=user_email where comment_post=${postId} order by comment_id desc; 
            `)

            return {
                success: true,
                comments: comments
            }
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

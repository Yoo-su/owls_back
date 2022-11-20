import { DataSource, Repository } from 'typeorm';
import CreateCommentDto from './dto/create-comment.dto';
import { Comment } from './entity/comment.entity';
export declare class CommentService {
    private commentRepository;
    private dataSource;
    constructor(commentRepository: Repository<Comment>, dataSource: DataSource);
    createComment(createCommentDto: CreateCommentDto): Promise<any>;
    getComments(postId: number): Promise<any>;
    deleteComment(comment_id: number): Promise<import("typeorm").DeleteResult>;
}

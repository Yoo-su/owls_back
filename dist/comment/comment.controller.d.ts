import { CommentService } from './comment.service';
import CreateCommentDto from './dto/create-comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    getComments(postId: number): Promise<any>;
    createComment(createCommentDto: CreateCommentDto): Promise<any>;
    deleteComment(comment_id: number): Promise<import("typeorm").DeleteResult>;
}

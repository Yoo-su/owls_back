import { Body, Controller, Delete, Get, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import CreateCommentDto from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/all')
    getComments(@Query('post_id') postId: number) {
        return this.commentService.getComments(postId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    createComment(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.createComment(createCommentDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')
    deleteComment(@Body() comment_id: number) {
        return this.commentService.deleteComment(comment_id);
    }
}

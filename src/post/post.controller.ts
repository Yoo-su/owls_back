import { Body, Controller, Delete, Get, Post, UploadedFile, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import CreatePostDto from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/all')
    getAllPosts() {
        return this.postService.getAllPost();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/friend')
    getAllFriendsPosts(@Query('user_email') user_email: string) {
        return this.postService.getFriendsPost(user_email);
    }

    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    @Post("/create")
    async createPost(@UploadedFile() file: Express.Multer.File, @Body() postData: any) {
        /* 첨부된 이미지 존재 시 구글 스토리지 저장 후 이미지 URL 생성 */
        if (file) {
            try {
                const fileUrl = `https://storage.googleapis.com/owls_image_bucket/${file.originalname}`
                await this.postService.createStorageFile(file);

                return this.postService.createPost({
                    ...postData,
                    post_image: fileUrl
                })
            } catch (err) {
                return {
                    success: false,
                    msg: err
                }
            }
        }
        else {
            return this.postService.createPost({
                ...postData,
                post_image: "",
            });
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/delete")
    deletePost(@Body('post_id') post_id: number) {
        return this.postService.deletePost(post_id);
    }
}

/// <reference types="multer" />
import { PostService } from './post.service';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAllPosts(): Promise<any>;
    getAllFriendsPosts(user_id: number): Promise<any>;
    createPost(file: Express.Multer.File, postData: any): Promise<any>;
    deletePost(post_id: number): Promise<void>;
}

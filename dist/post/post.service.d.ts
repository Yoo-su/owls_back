/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { Repository, DataSource } from 'typeorm';
import CreatePostDto from './dto/create-post.dto';
import { Post } from './entity/post.entity';
export declare class PostService {
    private postRepository;
    private dataSource;
    private configService;
    private storage;
    private bucket;
    constructor(postRepository: Repository<Post>, dataSource: DataSource, configService: ConfigService);
    createPost(createPostDto: CreatePostDto): Promise<any>;
    deletePost(post_id: number): Promise<void>;
    createStorageFile(file: Express.Multer.File): Promise<unknown>;
    deleteStorageFile(path: string): Promise<[import("teeny-request").Response<any>]>;
    getAllPosts(): Promise<any>;
    getFriendsPosts(user_id: number): Promise<any>;
    getUserPosts(user_id: number): Promise<any>;
}

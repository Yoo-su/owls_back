import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DownloadResponse, Storage, Bucket } from "@google-cloud/storage";
import { Repository, DataSource } from 'typeorm';
import CreatePostDto from './dto/create-post.dto';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {
    private storage: Storage;
    private bucket: Bucket;

    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectDataSource()
        private dataSource: DataSource,
        private configService: ConfigService) {
        this.storage = new Storage({
            projectId: configService.get<string>("PROJECT_ID"),
            credentials: {
                client_email: configService.get<string>("CLIENT_EMAIL"),
                private_key: configService.get<string>("PRIVATE_KEY"),
            }
        })

        this.bucket = this.storage.bucket("owls_image_bucket");
    }

    async createPost(createPostDto: CreatePostDto) {
        try {
            const instance = this.postRepository.create({
                ...createPostDto
            })

            const newEntity = await this.postRepository.save(instance);
            const createdPost = await this.dataSource.query(`
                select post_id, post_text, post_image, post_date, user_email, user_avatar, user_nickname from posts, users where post_id="${newEntity.post_id}";
            `)
            return {
                entity: createdPost,
                success: true
            }
        } catch (err) {
            return {
                success: false,
                msg: err
            }
        }

    }

    createStorageFile(file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            const blob = this.bucket.file(file.originalname);
            const blobStream = blob.createWriteStream();

            blobStream.on("finish", () => {
                resolve(true);
            });

            blobStream.end(file.buffer);
        })
    }


    async getAllPost() {
        try {
            const posts = await this.dataSource.query(`
                select post_id, post_text, post_image, post_date, user_email, user_avatar, user_nickname from posts, users where post_user=user_email order by post_id desc;
            `)
            return {
                success: true,
                posts: posts,
            }
        } catch (err) {
            return {
                success: false,
                msg: err
            }
        }

    }
}

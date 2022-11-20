import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Storage, Bucket } from "@google-cloud/storage";
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
    ) {
        this.storage = new Storage({
            projectId: process.env.PROJECT_ID,
            credentials: {
                client_email: process.env.CLIENT_EMAIL,
                private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
            }
        })

        this.bucket = this.storage.bucket("owls_image_bucket");
    }

    async createPost(createPostDto: CreatePostDto) {
        try {
            const instance = this.postRepository.create({
                ...createPostDto
            })

            await this.postRepository.save(instance);
            return await this.getAllPosts();
        } catch (err) {
            throw err;
        }
    }

    async deletePost(post_id: number) {
        try {
            const entity = await this.postRepository.findOne({ where: { post_id } });

            if (entity.post_image) {
                const path = entity.post_image.split("/").at(-1);
                const res = await this.deleteStorageFile(path);
            }

            await this.dataSource.query(`
                delete from comments where comment_post=${post_id};
            `);
            await this.postRepository.delete(post_id);

            return;
        } catch (err) {
            throw err
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

    async deleteStorageFile(path: string) {
        const res = await this.storage
            .bucket("owls_image_bucket")
            .file(path)
            .delete({ ignoreNotFound: true });

        return res;
    }


    async getAllPosts() {
        try {
            const posts = await this.dataSource.query(`
                select post_id, post_text, post_image, post_date, user_id, user_email, user_avatar, user_name, user_nickname from posts join users on post_user=user_id order by post_id desc;
            `)

            return posts
        } catch (err) {
            throw err
        }
    }

    //user_id로 친구들 포스트 검색해 리턴
    async getFriendsPosts(user_id: number) {
        try {
            const result = await this.dataSource.query(`
                select post_id, post_text, post_image, post_date, user_id, user_email, user_avatar, user_name, user_nickname from posts join users on post_user=user_id where post_user in (select friend_source as id from friends where friend_target="${user_id}" and updated_date IS NOT NULL union select friend_target as id from friends where friend_source="${user_id}" and updated_date IS NOT NULL);
            `);
            return result;
        } catch (err) {
            throw err;
        }
    }

    //user_id로 해당 유저 포스트 검색해 리턴
    async getUserPosts(user_id: number) {
        try {
            return await this.dataSource.query(`
            select post_id, post_text, post_image, post_date, user_id, user_email, user_avatar, user_name, user_nickname from posts join users on post_user=user_id where post_user=${user_id} order by post_id desc;
            `);
        } catch (err) {
            throw err;
        }
    }
}

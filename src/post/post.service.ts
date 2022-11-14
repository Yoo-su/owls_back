import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
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
        private configService: ConfigService) {
        this.storage = new Storage({
            projectId: configService.get<string>("PROJECT_ID"),
            credentials: {
                client_email: configService.get<string>("CLIENT_EMAIL"),
                private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdDLBI6Z8ovb/M\nYR+e1HSFUDOFwtn4OVFHju8TMX8wf1REWe+WfpMIKIZp0rYEeqFgaxIP4XfbZ6fk\nshfd5/GoVYoUzc0R8qPZPsGics8bcZjOAnj/kpgHcWwQko5J7lQl7Pk9pXLfxH8B\nAp+tHr9GYX/GYvVIbpYP1HWz2YcWTPHrxBAvouezfq6+Hs+BSC7KqFQPqxzzj05N\nkc58DN8RqNaWjuD+1r6lZbjBKmuIDis5FND9K+xcEdp+OJGsRN8CjW+FiKk0zktV\nv5DxRgQJNVk6L8mA5KSxfLnLk9hMX80/u0s7sbe1o3JnDJwvnHYKN0uFPrxOhbrK\nQOVyaS37AgMBAAECggEABbv9JkRlf2O3nPCIeN7KtUSKdtcjPm5nHkwL73hOefpZ\njpvMD8qezIdnnCCQpdUbx+fCtT1nJMlz2hZBhIEf2whcGNizFq5J4dT4ZARdQ6s1\ncvUaREFZhZ8po+kMO8QN1KB0hmtSKINiY44cIwJ7V49fQGKnnqsLeVDUI5xiU7kf\n2YgdmUQwu19sJlPqXs1J2ggMCwkcTdE+fJ3jgVS4TBKbbWAbd1tQVyapHEVdP1mk\nQSa+EkwVhzsPsqBbPbVG4Rq7D5p+WYPN4QDXeZ0DBrTQ19QigF9rijwVI7rAXlX4\nWPm0jU7QgED6X504CyqMTofvDaE1LeCgKYQPazb9MQKBgQDUHUKECtv2MJGF4yld\nB+yU6Wp5puwodzo+xcmiKWia096fJgYFy/3KblBX2KFE/b+6HxjZZ1/RDqXerXdS\npzTjmbKaQ6Vz0aS5xqejIkeJPMYV4IlF8kB1gdz3DYawMqM3IxU+qkWVDWDMef3G\nvrrgyZlTy/gHTdAV2iRd/wQ4qwKBgQC9iuXMci7H2/pHu/T8dN2ODc3dmQ4k6gxX\nIi5TvV3xRRrF/Oh0dX2VNS/9J92Ib0+896TD+XCGkiRFtqI/aTyK0ZPedq7PhEAq\nNL36WRcfuO1uIhaGBdzH34qfIb7oQlRa7vG2KVmWsd+BLI8om3lBaAgeoNzN4nXw\nTxGwe/l/8QKBgE9phPWaey94j4LowRurU8+Mc+iHrfKYcJ3/vrWPezI8ECTVP3v8\nG1AmbL32xKnntlggPFVodl72dPMhToMLRqnPaSaIHPF3k4xZ63kP5Ghk8GRQZBRj\n1e4oaGm2Dq74xlJmOBX1+YcMMylaosA9uAlgcJ8Gxh017KnBucvXJeVxAoGABl2Y\n1CHtkkbABBK66pOeMTwjctLGF9VIbtC2D5fnhMfWW1ngELE1c4JixzTEiuV6HxWO\nEgrZjZtw3mqAznJhVyQsvCbuPgfqA8DbtIGzdhxG1REOAphFzuyiAjAm8jPwE1G9\nCmofGSGGKRdvA2UdUGYHB8hNQhjd7yEore2r9nECgYAyHvQqQ2DTaGM3s3Yu9JTG\n4jSJ6invFv3P3E67WczEA3eAPGNxuLSsNvY35Tl3k22cu2wKCQ0atzyb/RQJB0VZ\nPgh98ypruv1lZarv1RMtEG3v9qDMgRQmBwLChff4uVhuV7PH13Fvp/6y9kjbSZxS\n1H7QKXVMIBXpTB47t4yjdA==\n-----END PRIVATE KEY-----\n",
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
            return await this.getAllPost();
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

            return await this.getAllPost();
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


    async getAllPost() {
        try {
            const posts = await this.dataSource.query(`
                select post_id, post_text, post_image, post_date, user_email, user_avatar, user_name, user_nickname from posts join users on post_user=user_email order by post_id desc;
            `)

            return posts
        } catch (err) {
            throw err
        }

    }
}

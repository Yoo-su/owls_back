import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Post } from './post/entity/post.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entity/comment.entity';
import { FriendModule } from './friend/friend.module';
import { Friend } from './friend/entity/friend.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: 'root',
      password: process.env.DB_PW,
      database: 'owls',
      entities: [User, Post, Comment, Friend],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    FriendModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

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
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "migae5o25m2psr4q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      port: 3306,
      username: 'bkbe1o5o4ff0q1l2',
      password: "koqge9nmfoh1q24b",
      database: 'bluhdyvzfto7tyzl',
      entities: [User, Post, Comment, Friend],
      connectTimeout: 20000,
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    FriendModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}

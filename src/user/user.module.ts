import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from "./entity/user.entity";
import { PostModule } from 'src/post/post.module';
import { FriendModule } from 'src/friend/friend.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User]), PostModule, FriendModule],
    exports: [UserService]
})
export class UserModule { }

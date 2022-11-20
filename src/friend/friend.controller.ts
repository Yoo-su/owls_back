import { Body, Controller, Delete, Get, Post, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import MakeFriendDto from './dto/makeFriend.dto';
import CreateFriendDto from './dto/createFriend.entity';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
    constructor(private friendService: FriendService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createFriend(@Body() createFriendDto: CreateFriendDto) {
        return this.friendService.createFriend(createFriendDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/make')
    makeFriend(@Body() makeFriendDto: MakeFriendDto) {
        return this.friendService.makeFriend(makeFriendDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')
    deleteFriend(@Body('friend_id') friend_id: number) {
        return this.friendService.deleteFriend(friend_id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    getFriendsList(@Query('user_id') user_id: number) {
        return this.friendService.getFriends(user_id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/request-list')
    getFriendRequestsList(@Query('friend_target') friend_target: number) {
        return this.friendService.getFriendRequests(friend_target);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/my-requests')
    getUserRequests(@Query('user_id') user_id: number) {
        return this.friendService.getUserRequests(user_id);
    }
}

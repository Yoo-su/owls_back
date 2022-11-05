import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>) { }

    findOne(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { user_email: email } });
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
}

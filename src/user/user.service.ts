import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>) { }

    async findOne(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { user_email: email } });
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async create(createUserDto: CreateUserDto) {
        const { user_name, user_nickname, user_email, user_password } = createUserDto;
        const isEmailExist = await this.usersRepository.findOne({ where: { user_email: user_email } });
        const isNicknameExist = await this.usersRepository.findOne({ where: { user_nickname: user_nickname } });
        if (isEmailExist) {
            return {
                success: false,
                msg: "이미 존재하는 이메일입니다"
            }
        }
        if (isNicknameExist) {
            return {
                success: false,
                msg: "이미 존재하는 닉네임입니다"
            }
        }

        const instance = this.usersRepository.create({
            ...createUserDto
        })
        await this.usersRepository.save(instance);
        return {
            success: true,
            msg: "회원 가입이 완료되었습니다"
        }
    }
}

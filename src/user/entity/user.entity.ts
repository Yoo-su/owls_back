import { Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';

@Entity({ schema: "owls", name: "users" })
export class User {
    @PrimaryGeneratedColumn('increment')
    user_id: number;

    @Column()
    user_name: string;

    @Column()
    user_nickname: string;

    @Column()
    user_avatar: string;

    @Column()
    user_email: string;

    @Column()
    user_password: string;
}
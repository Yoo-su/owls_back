import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: "owls", name: "users" })
export class User {
    @Column()
    user_name: string;

    @Column()
    user_nickname: string;

    @PrimaryGeneratedColumn()
    user_email: string;

    @Column()
    user_password: string;
}
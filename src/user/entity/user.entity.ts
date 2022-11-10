import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: "owls", name: "users" })
export class User {
    @Column()
    user_name: string;

    @Column()
    user_nickname: string;

    @Column()
    user_avatar: string;

    @PrimaryColumn()
    user_email: string;

    @Column()
    user_password: string;
}
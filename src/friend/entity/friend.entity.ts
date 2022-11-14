import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: "owls", name: "friends" })
export class Friend {
    @PrimaryGeneratedColumn('increment')
    friend_id: number;

    @Column()
    friend_source: string;

    @Column()
    friend_target: string;

    @Column()
    created_date: string;

    @Column()
    updated_date: string;
}

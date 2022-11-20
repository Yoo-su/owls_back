import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: "owls", name: "posts" })
export class Post {
    @PrimaryGeneratedColumn('increment')
    post_id: number;

    @Column()
    post_text: string;

    @Column()
    post_image: string;

    @Column()
    post_date: string;

    @Column()
    post_user: number;
}

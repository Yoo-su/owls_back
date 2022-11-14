import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: "owls", name: "comments" })
export class Comment {
    @PrimaryGeneratedColumn('increment')
    comment_id: number;

    @Column()
    comment_text: string;

    @Column()
    comment_date: string;

    @Column()
    comment_post: number;

    @Column()
    comment_user: string;
}

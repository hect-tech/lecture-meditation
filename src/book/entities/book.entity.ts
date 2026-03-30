import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Text } from '../../text/entities/text.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @ManyToOne(() => Author, { onDelete: 'SET NULL', nullable: true })
  author: Author | null;

  @OneToMany(() => Text, text => text.book)
  texts: Text[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { Text } from '../../text/entities/text.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => Book, book => book.author)
  books: Book[];

  @OneToMany(() => Text, text => text.author)
  texts: Text[];
}

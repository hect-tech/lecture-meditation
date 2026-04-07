import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Language } from '../../language/entities/language.entity';
import { Author } from '../../authors/entities/author.entity';
import { Book } from '../../book/entities/book.entity';
import { Audio } from '../../audio/entities/audio.entity';

@Entity('texts')
export class Text {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  reference: string | null;

  @Column({ type: 'text', nullable: true })
  audioUrl: string | null;

  @Column({ nullable: true })
  languageId: number;

  @Column({ nullable: true })
  bookId: number;

  @ManyToOne(() => Language, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'languageId' })
  language: Language;

  @ManyToOne(() => Author, { onDelete: 'SET NULL', nullable: true })
  author: Author | null;

  @ManyToOne(() => Book, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'bookId' })
  book: Book | null;

  @OneToMany(() => Audio, audio => audio.text)
  audios: Audio[];

  @OneToMany('DevotionText', 'text')
  devotionTexts: any[];
}

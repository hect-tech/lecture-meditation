import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
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

  @ManyToOne(() => Language, { onDelete: 'CASCADE' })
  language: Language;

  @ManyToOne(() => Author, { onDelete: 'SET NULL', nullable: true })
  author: Author | null;

  @ManyToOne(() => Book, { onDelete: 'SET NULL', nullable: true })
  book: Book | null;

  @OneToMany(() => Audio, audio => audio.text)
  audios: Audio[];

  @OneToMany('DevotionText', 'text')
  devotionTexts: any[];
}

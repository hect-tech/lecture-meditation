import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Text } from '../../text/entities/text.entity';
import { Language } from '../../language/entities/language.entity';

@Entity('audios')
export class Audio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  url: string;

  @ManyToOne(() => Text, { onDelete: 'CASCADE', nullable: true })
  text: Text | null;

  @ManyToOne(() => Language, { onDelete: 'CASCADE' })
  language: Language;
}

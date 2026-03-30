import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Text } from '../../text/entities/text.entity';
import { Audio } from '../../audio/entities/audio.entity';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true })
  code: string;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Text, text => text.language)
  texts: Text[];

  @OneToMany(() => Audio, audio => audio.language)
  audios: Audio[];
}

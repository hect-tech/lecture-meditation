import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DevotionText } from './devotion-text.entity';

@Entity('devotions')
export class Devotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', unique: true })
  date: Date;

  @Column({ length: 50 })
  bahaiMonth: string;

  @Column({ type: 'int' })
  day: number;

  @Column({ type: 'int', nullable: true })
  month: number;

  @OneToMany(() => DevotionText, devotionText => devotionText.devotion)
  devotionTexts: DevotionText[];
}

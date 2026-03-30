import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany('DevotionText', 'devotion')
  devotionTexts: any[];
}

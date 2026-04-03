import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Devotion } from './devotion.entity';
import { Text } from '../../text/entities/text.entity';

export enum DevotionMoment {
  MORNING = 'MORNING',
  EVENING = 'EVENING'
}

@Entity('devotion_texts')
export class DevotionText {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Devotion, devotion => devotion.devotionTexts, { onDelete: 'CASCADE' })
  devotion: Devotion;

  @Column({ type: 'int' })
  devotionId: number;

  @ManyToOne(() => Text, { onDelete: 'CASCADE' })
  text: Text;

  @Column({ type: 'int' })
  textId: number;

  @Column({
    type: 'enum',
    enum: DevotionMoment,
  })
  moment: DevotionMoment;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;
}

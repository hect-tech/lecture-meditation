import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Text } from '../../text/entities/text.entity';

export enum DevotionMoment {
  MORNING = 'MORNING',
  EVENING = 'EVENING'
}

@Entity('devotion_texts')
export class DevotionText {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Devotion', 'devotionTexts', { onDelete: 'CASCADE' })
  devotion: any;

  @ManyToOne(() => Text, { onDelete: 'CASCADE' })
  text: Text;

  @Column({
    type: 'enum',
    enum: DevotionMoment,
  })
  moment: DevotionMoment;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;
}

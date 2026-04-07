import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Text } from '../../text/entities/text.entity';

@Entity('daily_reflections')
export class DailyReflection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', unique: true })
  date: Date;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  quote: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  quoteAuthor: string;

  @Column({ type: 'text', nullable:true})
  description: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  theme: string;

  @Column({ type: 'int', nullable: true })
  readTime: number; // en minutes

  @Column({ type: 'varchar', length: 500, nullable: true })
  closingImageUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  closingText: string;

  @Column({ type: 'simple-array', nullable: true })
  reflectionPrompts: string[];

  @ManyToOne(() => Text, { nullable: true })
  @JoinColumn()
  relatedText: Text;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

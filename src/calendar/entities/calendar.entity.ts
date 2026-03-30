import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('calendar_events')
export class CalendarEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  titre: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'timestamp' })
  dateDebut: Date;

  @Column({ type: 'timestamp' })
  dateFin: Date;

  @Column({ type: 'varchar', length: 50, default: 'event' })
  type: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  lieu: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  couleur: string | null;

  @Column({ type: 'boolean', default: false })
  isAllDay: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

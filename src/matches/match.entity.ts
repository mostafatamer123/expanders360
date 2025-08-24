import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Vendor } from '../vendors/vendor.entity';

@Entity('matches')
@Index(['project_id', 'vendor_id'], { unique: true })
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: number;

  @ManyToOne(() => Project, p => p.matches, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  vendor_id: number;

  @ManyToOne(() => Vendor, v => v.matches, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @Column('float')
  score: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}

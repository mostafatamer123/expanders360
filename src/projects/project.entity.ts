import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Client } from '../clients/client.entity';
import { Match } from '../matches/match.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_id: number;

  @ManyToOne(() => Client, c => c.project)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  country: string;

  @Column('json')
  services_needed: string[];

  @Column('decimal', { precision: 12, scale: 2 })
  budget: number;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => Match, m => m.project)
  matches: Match[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Match } from '../matches/match.entity';

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  countries_supported: string[];

  @Column('json')
  services_offered: string[];

  @Column('int', { default: 0 })
  rating: number;

  @Column('int', { default: 48 })
  response_sla_hours: number;

  @OneToMany(() => Match, m => m.vendor)
  matches: Match[];
}

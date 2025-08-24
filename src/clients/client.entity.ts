import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

  @Column()
  contact_email: string;

  @OneToMany(() => Project, p => p.client)
  project
  users: any;}

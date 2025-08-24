import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Client } from '../clients/client.entity';

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: Role, default: Role.CLIENT })
  role: Role;

  @Column({ nullable: true })
  clientId?: number;

  @ManyToOne(() => Client, client => client.users)
  client?: Client;
}

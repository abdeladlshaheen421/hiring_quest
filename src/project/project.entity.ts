import { Client } from 'src/client/client.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectStatusEnum } from './project.enum';
import { Match } from 'src/match/match.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  country: string;

  @Column('simple-array', { name: 'services_needed' })
  servicesNeeded: string[];

  @Column('decimal')
  budget: number;

  @Column({
    type: 'enum',
    enum: ProjectStatusEnum,
    default: ProjectStatusEnum.TODO,
  })
  status: string;

  @OneToMany(() => Match, (match) => match.project)
  matches: Match[];
}

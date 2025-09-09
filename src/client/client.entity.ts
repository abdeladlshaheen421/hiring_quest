import { Project } from 'src/project/project.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'contact_email' })
  contactEmail: string;

  @OneToMany(() => Project, (project) => project.client)
  projects: Project[];

  @OneToOne(() => User, (user) => user.client)
  user: User;
}

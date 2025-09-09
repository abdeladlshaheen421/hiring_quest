import { Match } from 'src/match/match.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vendors' })
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array', { name: 'countries_supported' })
  countriesSupported: string[];

  @Column('simple-array', { name: 'services_offered' })
  servicesOffered: string[];

  @Column('decimal')
  rating: number;

  @Column({ name: 'response_sla_hours', type: 'int' })
  responseSlaHours: number;

  @OneToMany(() => Match, (match) => match.vendor)
  matches: Match[];
}

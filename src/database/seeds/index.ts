import 'reflect-metadata';
import { AppDataSource } from '../../../data-source';

import { Client } from '../../client/client.entity';
import { Vendor } from '../../vendor/vendor.entity';
import { Project } from '../../project/project.entity';
import { Match } from '../../match/match.entity';

import clients from './clients.json';
import vendors from './vendors.json';
import projects from './projects.json';
import matches from './matches.json';
import users from './users';
import { User } from 'src/user/user.entity';
async function seedMysql() {
  const dataSource = await AppDataSource.initialize();
  const clientRepository = dataSource.getRepository(Client);
  const vendorRepository = dataSource.getRepository(Vendor);
  const projectRepository = dataSource.getRepository(Project);
  const matchRepository = dataSource.getRepository(Match);
  const userRepository = dataSource.getRepository(User);

  // Clients Seeder
  await clientRepository.upsert(clients ?? [], ['id']);

  // Vendors Seeder
  await vendorRepository.upsert(vendors ?? [], ['id']);

  // Projects Seeder
  await projectRepository.upsert(projects ?? [], ['id']);

  // Matches Seeders
  await matchRepository.upsert(matches ?? [], ['id']);

  await userRepository.upsert(users ?? [], ['id']);

  await dataSource.destroy();
}

(async () => {
  try {
    await seedMysql();
    console.log('Seeds Finished Successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed', err);
    process.exit(1);
  }
})();

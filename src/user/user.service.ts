import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({
      username,
    });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id });
  }
}

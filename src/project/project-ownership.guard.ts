import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectOwnershipGuard implements CanActivate {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user as { role: string; client?: { id: string } };
    const projectId = req.params?.id;
    if (!projectId || user?.role !== 'client') return true;
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
      relations: ['client'],
    });
    if (!project || project.client.id !== user?.client?.id) {
      throw new NotFoundException({ message: 'Project not found' });
    }
    return true;
  }
}

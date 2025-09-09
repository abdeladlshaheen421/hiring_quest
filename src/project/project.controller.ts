import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/client/client.enum';
import { ProjectService } from './project.service';
import {
  CurrentUser,
  AuthUser,
} from 'src/auth/decorators/current-user.decorator';
import { ProjectOwnershipGuard } from './project-ownership.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}

  @Post(':id/matches/rebuild')
  @Role(RoleEnum.ADMIN, RoleEnum.CLIENT)
  @UseGuards(ProjectOwnershipGuard)
  async rebuildMatches(
    @Param('id') projectId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.projectService.rebuildMatches(projectId, user);
  }
}

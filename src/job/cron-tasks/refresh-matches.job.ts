import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class RefreshMatchesJob {
  private readonly logger = new Logger(RefreshMatchesJob.name);

  constructor(private readonly projectService: ProjectService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleRefreshMatches() {
    try {
      await this.projectService.rebuildMatchesForActiveProjects();
    } catch (error) {
      this.logger.error('❌ Error while refreshing matches', error.stack);
    }
  }
}

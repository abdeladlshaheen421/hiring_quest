import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ProjectsModule } from 'src/project/project.module';
import { VendorsModule } from 'src/vendor/vendor.module';
import { RefreshMatchesJob } from './cron-tasks/refresh-matches.job';
import { FlagVendorsJob } from './cron-tasks/flag-vendor.job';

@Module({
  imports: [ScheduleModule.forRoot(), ProjectsModule, VendorsModule],
  providers: [RefreshMatchesJob, FlagVendorsJob],
})
export class JobModule {}

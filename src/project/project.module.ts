import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { Vendor } from 'src/vendor/vendor.entity';
import { Match } from 'src/match/match.entity';
import { VendorsModule } from 'src/vendor/vendor.module';
import { MatchesModule } from 'src/match/match.module';
import { NotificationModule } from 'src/notification/notification.module';
import { ProjectOwnershipGuard } from './project-ownership.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Vendor, Match]),
    VendorsModule,
    MatchesModule,
    NotificationModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectService, ProjectOwnershipGuard],
  exports: [ProjectService],
})
export class ProjectsModule {}

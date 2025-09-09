import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytic.controller';
import { AnalyticsService } from './analytic.service';
import { Match } from 'src/match/match.entity';
import { ResearchDocModule } from 'src/research-doc/research-doc.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), ResearchDocModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

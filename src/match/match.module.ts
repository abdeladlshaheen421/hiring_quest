import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesController } from './match.controller';
import { MatchService } from './match.service';
import { Match } from './match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [MatchesController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchesModule {}

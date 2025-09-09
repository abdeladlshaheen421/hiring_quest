import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchDoc, ResearchDocSchema } from './research-doc.document';
import { ResearchDocService } from './research-doc.service';
import { ResearchDocController } from './research-doc.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ResearchDoc.name, schema: ResearchDocSchema },
    ]),
  ],
  providers: [ResearchDocService],
  controllers: [ResearchDocController],
  exports: [ResearchDocService],
})
export class ResearchDocModule {}

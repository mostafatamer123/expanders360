import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Match } from '../matches/match.entity';
import { ResearchDoc, ResearchDocSchema } from '../documents/doc.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    MongooseModule.forFeature([
      { name: ResearchDoc.name, schema: ResearchDocSchema }, // ✅ register ResearchDocModel
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}

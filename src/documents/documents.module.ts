import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { ResearchDoc, ResearchDocSchema } from './doc.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ResearchDoc.name, schema: ResearchDocSchema }])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService]
})
export class DocumentsModule {}

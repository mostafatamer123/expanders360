import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResearchDoc } from './doc.schema';

@Injectable()
export class DocumentsService {
  constructor(@InjectModel(ResearchDoc.name) private model: Model<any>) {}

  create(data: Partial<ResearchDoc>) {
    return this.model.create(data);
  }

  search(query: { tag?: string; q?: string; projectId?: number }) {
    const filter: any = {};
    if (query.projectId) filter.projectId = query.projectId;
    if (query.tag) filter.tags = query.tag;
    let mongoQuery = this.model.find(filter);
    if (query.q) mongoQuery = mongoQuery.find({ $text: { $search: query.q } });
    return mongoQuery.limit(50).lean();
  }
}

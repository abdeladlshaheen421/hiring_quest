import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ResearchDoc, ResearchDocDocument } from './research-doc.document';

interface CreateDocDto {
  title: string;
  content: string;
  tags?: string[];
  projectId: string;
  avatarFd: string;
}

@Injectable()
export class ResearchDocService {
  constructor(
    @InjectModel(ResearchDoc.name)
    private readonly docModel: Model<ResearchDocDocument>,
  ) {}

  async create(dto: CreateDocDto) {
    const created = new this.docModel({ ...dto, tags: dto.tags ?? [] });
    return created.save();
  }

  async search(params: { tag?: string; text?: string; projectId?: string }) {
    const filter: FilterQuery<ResearchDocDocument> = {};
    if (params.projectId) filter.projectId = params.projectId;
    if (params.tag) filter.tags = { $in: [params.tag] };
    if (params.text) (filter as any).$text = { $search: params.text };
    return this.docModel.find(filter).sort({ createdAt: -1 }).limit(100).lean();
  }

  async countByTagAndCountry(tag: string, country: string) {
    const pipeline = [
      { $match: { tags: tag, $text: { $search: country } } },
      { $count: 'count' },
    ];
    const out = await this.docModel.aggregate(pipeline).exec();
    return out[0]?.count ?? 0;
  }
}

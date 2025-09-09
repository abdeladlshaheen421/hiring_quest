import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/match/match.entity';
import { Repository } from 'typeorm';
import { ResearchDocService } from 'src/research-doc/research-doc.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private readonly researchDocService: ResearchDocService,
  ) {}

  async topVendors() {
    const qb = this.matchRepository
      .createQueryBuilder('m')
      .innerJoin('m.project', 'p')
      .innerJoin('m.vendor', 'v')
      .where('m.created_at >= NOW() - INTERVAL 30 DAY')
      .select('p.country', 'country')
      .addSelect('v.id', 'vendor_id')
      .addSelect('v.name', 'vendor_name')
      .addSelect('AVG(m.score)', 'avg_score')
      .groupBy('p.country')
      .addGroupBy('v.id')
      .addGroupBy('v.name');

    const rows = await qb.getRawMany<{
      country: string;
      vendor_id: string;
      vendor_name: string;
      avg_score: string;
    }>();

    const byCountry: Record<
      string,
      Array<{ id: string; name: string; avg: number }>
    > = {};
    for (const r of rows) {
      const avg = Number(r.avg_score);
      (byCountry[r.country] ||= []).push({
        id: r.vendor_id,
        name: r.vendor_name,
        avg,
      });
    }
    const result: Array<{
      country: string;
      topVendors: Array<{ id: string; name: string; avgScore: number }>;
      researchDocCount: number;
    }> = [];

    for (const [country, vendors] of Object.entries(byCountry)) {
      const top = vendors.sort((a, b) => b.avg - a.avg).slice(0, 3);
      const researchDocCount =
        await this.researchDocService.countByTagAndCountry(
          'expansion',
          country,
        );
      result.push({
        country,
        topVendors: top.map((t) => ({
          id: t.id,
          name: t.name,
          avgScore: t.avg,
        })),
        researchDocCount,
      });
    }
    return result;
  }
}

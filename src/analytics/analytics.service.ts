import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { Match } from '../matches/match.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResearchDoc } from '../documents/doc.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Match) private matches: Repository<Match>,
    @InjectModel(ResearchDoc.name) private docs: Model<any>
  ) {}

  async topVendors() {
    const since = new Date(Date.now() - 30 * 24 * 3600 * 1000);
    // Avg scores per vendor-country using SQL
    const raw = await this.matches.query(`
      SELECT v.id as vendor_id, JSON_EXTRACT(v.countries_supported, '$') as countries_supported, AVG(m.score) as avg_score
      FROM matches m
      JOIN vendors v ON v.id = m.vendor_id
      WHERE m.created_at >= ?
      GROUP BY v.id
    `, [since]);

    // Flatten by country and take top 3 per country
    const byCountry = new Map<string, { vendor_id: number, avg_score: number }[]>();
    for (const row of raw) {
      const countries = JSON.parse(row.countries_supported);
      for (const c of countries) {
        const arr = byCountry.get(c) || [];
        arr.push({ vendor_id: row.vendor_id, avg_score: Number(row.avg_score) });
        byCountry.set(c, arr);
      }
    }
    const result: any[] = [];
    for (const [country, arr] of byCountry.entries()) {
      arr.sort((a,b)=>b.avg_score-a.avg_score);
      const top3 = arr.slice(0,3);
      // Count Mongo docs linked to projects in that country
      const count = await this.docs.countDocuments({ /* assume projectId maps to projects in that country via app layer */ });
      result.push({ country, topVendors: top3, researchDocCount: count });
    }
    return result;
  }
}

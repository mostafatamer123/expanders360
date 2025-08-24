import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, DataSource } from 'typeorm';
import { Match } from './match.entity';
import { Project } from '../projects/project.entity';
import { Vendor } from '../vendors/vendor.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private repo: Repository<Match>,
    @InjectDataSource() private dataSource: DataSource,
    private notifications: NotificationsService
  ) {}

  private score(project: Project, vendor: Vendor): number {
    const overlap = project.services_needed.filter(s => vendor.services_offered.includes(s)).length;
    const SLA_weight = Math.max(0, 10 - (vendor.response_sla_hours / 12));
    return overlap * 2 + vendor.rating + SLA_weight;
  }

  async rebuildForProject(projectId: number) {
    const project = await this.dataSource.getRepository(Project).findOne({ where: { id: projectId } });
    if (!project) throw new Error('Project not found');

    const vendors = await this.dataSource.getRepository(Vendor).find();
    const candidates = vendors.filter(v =>
      v.countries_supported.includes(project.country) &&
      project.services_needed.some(s => v.services_offered.includes(s))
    );

    const toUpsert: Partial<Match>[] = candidates.map(v => ({
      project_id: project.id,
      vendor_id: v.id,
      score: this.score(project, v)
    }));

    let created = 0;
    for (const m of toUpsert) {
      const existing = await this.repo.findOne({ where: { project_id: m.project_id!, vendor_id: m.vendor_id! } });
      if (existing) {
        existing.score = m.score!;
        await this.repo.save(existing);
      } else {
        await this.repo.save(this.repo.create(m));
        created++;
      }
    }
    if (created > 0) {
      await this.notifications.notifyMatchGeneration(project, created);
    }
    return { projectId, matches: toUpsert.length, created };
  }
}

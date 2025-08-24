import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private repo: Repository<Project>) {}
  findById(id: number) { return this.repo.findOne({ where: { id } }); }
  listForClient(clientId: number) { return this.repo.find({ where: { client_id: clientId } }); }
  async create(clientId: number, data: Partial<Project>) {
    const entity = this.repo.create({ ...data, client_id: clientId });
    return this.repo.save(entity);
  }
}

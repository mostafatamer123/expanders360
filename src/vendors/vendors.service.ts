import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorsService {
  constructor(@InjectRepository(Vendor) private repo: Repository<Vendor>) {}
  list() { return this.repo.find(); }
  findById(id: number) { return this.repo.findOne({ where: { id } }); }
}

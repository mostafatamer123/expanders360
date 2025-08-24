import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { VendorsService } from './vendors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  providers: [VendorsService],
  exports: [VendorsService, TypeOrmModule]
})
export class VendorsModule {}

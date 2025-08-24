import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { VendorsModule } from '../vendors/vendors.module';
import { MatchesModule } from '../matches/matches.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), VendorsModule, MatchesModule, NotificationsModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService, TypeOrmModule]
})
export class ProjectsModule {}

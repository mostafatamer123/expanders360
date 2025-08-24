import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { MatchesService } from './matches.service';
import { VendorsModule } from '../vendors/vendors.module';
import { ProjectsModule } from '../projects/projects.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match]),NotificationsModule,],
  providers: [MatchesService],
  exports: [MatchesService]
})
export class MatchesModule {}

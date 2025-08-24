import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [ScheduleModule.forRoot(), MatchesModule],
  providers: [TasksService]
})
export class TasksModule {}

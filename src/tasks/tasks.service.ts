import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MatchesService } from '../matches/matches.service';

@Injectable()
export class TasksService {
  private logger = new Logger(TasksService.name);
  constructor(private matches: MatchesService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async refresh() {
    this.logger.log('Daily refresh would run here (fetch active projects and rebuild)');
  }
}

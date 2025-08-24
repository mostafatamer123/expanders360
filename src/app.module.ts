import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { typeOrmConfig } from './typeorm.config'; // ✅ Import config factory
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { VendorsModule } from './vendors/vendors.module';
import { MatchesModule } from './matches/matches.module';
import { DocumentsModule } from './documents/documents.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig()), // ✅ FIXED


    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/expanders360'),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    ClientsModule,
    ProjectsModule,
    VendorsModule,
    MatchesModule,
    DocumentsModule,
    AnalyticsModule,
    NotificationsModule,
    TasksModule,
  ],
})
export class AppModule {}

// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]) // Import Task entity here
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule] // Export TypeOrmModule if needed in other modules
})
export class TasksModule {}

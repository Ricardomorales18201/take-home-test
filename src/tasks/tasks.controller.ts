// src/tasks/tasks.controller.ts
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../tasks/task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Post()
    createTask(@Body() task: Partial<Task>): Promise<Task> {
        return this.tasksService.create(task);
    }

    @Get(':id')
    getTaskById(@Param('id') id: number): Promise<Task> {
        return this.tasksService.findOne(id);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number): Promise<void> {
        return this.tasksService.remove(id);
    }
}

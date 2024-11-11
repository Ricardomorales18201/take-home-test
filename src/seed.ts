// seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TasksService } from './tasks/tasks.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const tasksService = app.get(TasksService);

    await tasksService.create({ title: 'Sample Task 1', description: 'This is a sample task.' });
    await tasksService.create({ title: 'Sample Task 2', description: 'This is another sample task.' });

    console.log('Seeding completed');
    await app.close();
}

bootstrap();

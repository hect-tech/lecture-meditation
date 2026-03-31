import { Controller, Post } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedData } from './seeds/initial-data.seed';

@Controller('database')
export class DatabaseController {
  constructor(private dataSource: DataSource) {}

  @Post('seed')
  async seedDatabase() {
    await seedData(this.dataSource);
    return { message: 'Base de données initialisée avec succès' };
  }
}

import { Controller, Post } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { seedData } from './seeds/initial-data.seed';

@Controller('database')
export class DatabaseController {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource) {}

  @Post('seed')
  async seedDatabase() {
    await seedData(this.dataSource);
    return { message: 'Base de données initialisée avec succès' };
  }
}

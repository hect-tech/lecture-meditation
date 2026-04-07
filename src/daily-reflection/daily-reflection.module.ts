import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyReflectionController } from './daily-reflection.controller';
import { DailyReflectionService } from './daily-reflection.service';
import { DailyReflection } from './entities/daily-reflection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyReflection])],
  controllers: [DailyReflectionController],
  providers: [DailyReflectionService],
})
export class DailyReflectionModule {}

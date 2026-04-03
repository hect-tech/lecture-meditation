import { Module } from '@nestjs/common';
import { DevotionController } from './devotion.controller';
import { DevotionService } from './devotion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devotion } from './entities/devotion.entity';
import { DevotionText } from './entities/devotion-text.entity';
import { BahaiDateModule } from '../bahai-date/bahai-date.module';

@Module({
  imports: [TypeOrmModule.forFeature([Devotion, DevotionText]), BahaiDateModule],
  controllers: [DevotionController],
  providers: [DevotionService],
})
export class DevotionModule {}

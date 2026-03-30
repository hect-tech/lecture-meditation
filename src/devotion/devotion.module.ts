import { Module } from '@nestjs/common';
import { DevotionController } from './devotion.controller';
import { DevotionService } from './devotion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devotion } from './entities/devotion.entity';
import { DevotionText } from './entities/devotion-text.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Devotion, DevotionText])],
  controllers: [DevotionController],
  providers: [DevotionService],
})
export class DevotionModule {}

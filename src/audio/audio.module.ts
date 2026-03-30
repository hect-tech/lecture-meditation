import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audio } from './entities/audio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Audio])],
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule {}

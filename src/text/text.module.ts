import { Module } from '@nestjs/common';
import { TextController } from './text.controller';
import { TextService } from './text.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './entities/text.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Text])],
  controllers: [TextController],
  providers: [TextService],
})
export class TextModule {}

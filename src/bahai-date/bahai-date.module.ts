import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BahaiDateService } from './bahai-date.service';
import { BahaiDateController } from './bahai-date.controller';

@Module({
  imports: [HttpModule],
  controllers: [BahaiDateController],
  providers: [BahaiDateService],
  exports: [BahaiDateService],
})
export class BahaiDateModule {}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BahaiDateService } from './bahai-date.service';

@ApiTags('bahai-date')
@Controller('bahai-date')
export class BahaiDateController {
  constructor(private readonly bahaiDateService: BahaiDateService) {}

  @Get('today')
  @ApiOperation({ summary: 'Obtenir la date baháʼí du jour' })
  getToday() {
    return this.bahaiDateService.getTodayBahaiDate();
  }

  @Get('format')
  @ApiOperation({ summary: 'Formater une date en français' })
  @ApiQuery({ name: 'date', required: true, example: '2026-04-02' })
  formatDate(@Query('date') date: string) {
    return this.bahaiDateService.formatDateEndpoint(date);
  }

  @Get('date')
  @ApiOperation({ summary: 'Obtenir la date baháʼí pour une date spécifique' })
  @ApiQuery({ name: 'date', required: true, example: '2026-04-02' })
  getDate(@Query('date') date: string) {
    return this.bahaiDateService.getBahaiDate(date);
  }
}

import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
 
import { CreateDailyReflectionDto, UpdateDailyReflectionDto } from './dto/create-daily-reflection.dto';
import { DailyReflectionService } from './daily-reflection.service';

@ApiTags('daily-reflections')
@Controller('api/daily-reflections')
export class DailyReflectionController {
  constructor(private readonly dailyReflectionService: DailyReflectionService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une réflexion quotidienne' })
  create(@Body() createDto: CreateDailyReflectionDto) {
    return this.dailyReflectionService.create(createDto);
  }

  @Get('today')
  @ApiOperation({ summary: 'Récupérer la réflexion du jour' })
  getTodayReflection() {
    return this.dailyReflectionService.getTodayReflection();
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les réflexions' })
  findAll() {
    return this.dailyReflectionService.findAll();
  }

  @Get(':date')
  @ApiOperation({ summary: 'Récupérer une réflexion par date (YYYY-MM-DD)' })
  getByDate(@Param('date') date: string) {
    return this.dailyReflectionService.getByDate(date);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une réflexion' })
  update(@Param('id') id: number, @Body() updateDto: UpdateDailyReflectionDto) {
    return this.dailyReflectionService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une réflexion' })
  remove(@Param('id') id: number) {
    return this.dailyReflectionService.remove(id);
  }
}

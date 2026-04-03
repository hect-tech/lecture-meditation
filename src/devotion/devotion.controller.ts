import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { DevotionService } from './devotion.service';
import { CreateDevotionDto } from './dto/create-devotion.dto';
import { CreateDevotionTextDto } from './dto/create-devotion-text.dto';

@ApiTags('devotion')
@Controller('devotion')
export class DevotionController {
  constructor(private readonly devotionService: DevotionService) {}

  // Devotion endpoints
  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle dévotion' })
  create(@Body() createDevotionDto: CreateDevotionDto) {
    return this.devotionService.create(createDevotionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les dévotions' })
  findAll() {
    return this.devotionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une dévotion par ID' })
  findOne(@Param('id') id: string) {
    return this.devotionService.findOne(+id);
  }

  @Get('date/:date')
  @ApiOperation({ summary: 'Récupérer une dévotion par date' })
  @ApiParam({ name: 'date', example: '2026-04-03' })
  findByDate(@Param('date') date: string) {
    return this.devotionService.findByDate(new Date(date));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une dévotion' })
  update(@Param('id') id: string, @Body() updateDevotionDto: any) {
    return this.devotionService.update(+id, updateDevotionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une dévotion' })
  remove(@Param('id') id: string) {
    return this.devotionService.remove(+id);
  }

  // DevotionText endpoints
  @Post('text')
  @ApiOperation({ summary: 'Ajouter un texte à une dévotion' })
  createDevotionText(@Body() createDevotionTextDto: CreateDevotionTextDto) {
    return this.devotionService.createDevotionText(createDevotionTextDto);
  }

  @Get('text/all')
  @ApiOperation({ summary: 'Récupérer tous les textes de dévotion' })
  findAllDevotionTexts() {
    return this.devotionService.findAllDevotionTexts();
  }

  @Get(':devotionId/texts')
  @ApiOperation({ summary: 'Récupérer les textes d\'une dévotion' })
  findDevotionTextsByDevotion(@Param('devotionId') devotionId: string) {
    return this.devotionService.findDevotionTextsByDevotion(+devotionId);
  }

  @Patch('text/:id')
  @ApiOperation({ summary: 'Mettre à jour un texte de dévotion' })
  updateDevotionText(@Param('id') id: string, @Body() updateDevotionTextDto: any) {
    return this.devotionService.updateDevotionText(+id, updateDevotionTextDto);
  }

  @Delete('text/:id')
  @ApiOperation({ summary: 'Supprimer un texte de dévotion' })
  removeDevotionText(@Param('id') id: string) {
    return this.devotionService.removeDevotionText(+id);
  }

  // Lecture du jour endpoints
  @Get('today')
  @ApiOperation({ summary: 'Lecture du jour' })
  @ApiQuery({ name: 'lang', required: false, example: 'fr', description: 'Code langue' })
  getTodayReading(@Query('lang') languageCode?: string) {
    return this.devotionService.getTodayReading(languageCode || 'fr');
  }

  @Get('reading/:date')
  @ApiOperation({ summary: 'Lecture par date spécifique' })
  @ApiParam({ name: 'date', example: '2026-04-03' })
  @ApiQuery({ name: 'lang', required: false, example: 'fr', description: 'Code langue' })
  getReadingByDate(@Param('date') date: string, @Query('lang') languageCode?: string) {
    return this.devotionService.getReadingByDate(date, languageCode || 'fr');
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/createLanguageDto.dto';

@ApiTags('languages')
@Controller('languages')
export class LanguageController {
  constructor(
    private readonly languageService: LanguageService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle langue' })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    const result = this.languageService.create(createLanguageDto);
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les langues' })
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une langue par ID' })
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une langue' })
  update(@Param('id') id: string, @Body() updateLanguageDto: any) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une langue' })
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}


import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/createLanguageDto.dto';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('languages')
export class LanguageController {
  constructor(
    
    private readonly languageService: LanguageService
  ) {}

  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    const result = this.languageService.create(createLanguageDto);
    return result;
  }

  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLanguageDto: any) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}


import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthorDto } from './dto/author.dto';
import { AuthorsService } from './authors.service';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les auteurs' })
  findAll() {
    return this.authorsService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un auteur par ID' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel auteur' })
  create(@Body() authorDto: AuthorDto) {
    return this.authorsService.create(authorDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un auteur' })
  update(@Param('id') id: string, @Body() authorDto: AuthorDto) {
    return this.authorsService.update(id, authorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un auteur' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}

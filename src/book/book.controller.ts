import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dto/createBookDto.dto';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau livre' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les livres' })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un livre par ID' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un livre' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un livre' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }

  // Endpoints de lecture avancés
  @Get(':id/texts')
  @ApiOperation({ summary: 'Récupérer un livre avec ses textes' })
  findWithTexts(@Param('id') id: string) {
    return this.bookService.findWithTexts(+id);
  }

  @Get('author/:authorId')
  @ApiOperation({ summary: 'Récupérer les livres d\'un auteur' })
  @ApiParam({ name: 'authorId', example: 1 })
  findByAuthor(@Param('authorId') authorId: string) {
    return this.bookService.findByAuthor(+authorId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher des livres par titre' })
  @ApiQuery({ name: 'title', required: true, example: 'Kitáb' })
  searchByTitle(@Query('title') title: string) {
    return this.bookService.searchByTitle(title);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Récupérer les statistiques d\'un livre' })
  getBookStats(@Param('id') id: string) {
    return this.bookService.getBookStats(+id);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorDto } from './dto/author.dto';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

    @Get()
    findAll() {
        return this.authorsService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authorsService.findOne(id);
    }

    @Post()
    create(@Body() authorDto: AuthorDto) {
        return this.authorsService.create(authorDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() authorDto: AuthorDto) {
        return this.authorsService.update(id, authorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authorsService.remove(id);
    }
}

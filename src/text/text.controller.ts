import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TextService } from './text.service';
import { createTextDto } from './dto/createTextDto.dto';

@Controller('texts')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  create(@Body() createTextDto: createTextDto) {
    return this.textService.create(createTextDto);
  }

  @Get()
  findAll() {
    return this.textService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextDto: any) {
    return this.textService.update(+id, updateTextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textService.remove(+id);
  }
}

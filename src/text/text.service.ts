import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextInterface } from './interfaces/text.interface';
import { Text } from './entities/text.entity';
import { ResponseService } from 'src/common/services/response.service';
import { createTextDto } from './dto/createTextDto.dto';
 
 

@Injectable()
export class TextService {

  constructor(
    @InjectRepository(Text)
    private textRepository: Repository<Text>,
  ) {}

  async create(createTextDto: createTextDto) {
      const text = this.textRepository.create({
        content: createTextDto.content,
        reference: createTextDto.reference,
        language: { id: createTextDto.languageId },
        ...(createTextDto.bookId && { book: { id: createTextDto.bookId } })
      })

      const result = await this.textRepository.save(text);
      return ResponseService.created(result, 'Text créé avec succès');
  }

 async findAll() {
    const texts = await this.textRepository.find({
      relations: ['language', 'book']
    });

    return ResponseService.success(texts, 'Liste de tous les texts')
    
  }

  findOne(id: number) {
    return this.textRepository.findOne({ where: { id }, relations: ['language', 'book'] });
  }

  async update(id: number, updateTextDto: Partial<Text>) {
    if (!await this.checkTextExists(id)) {
      return ResponseService.notFound('Text non trouvé');
    }
    const result = await this.textRepository.update(id, updateTextDto);
    return ResponseService.updated(result, 'Text mis à jour avec succès');
  }

  async remove(id: number) {
    if (!await this.checkTextExists(id)) {
      return ResponseService.notFound('Text non trouvé');
    }
    await this.textRepository.delete(id);
    return ResponseService.deleted('Text supprimé avec succès');
  }

  async checkTextExists(id: number) {
    return await this.textRepository.exists({ where: { id } });
  }
}

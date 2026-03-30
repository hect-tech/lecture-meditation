import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextInterface } from './interfaces/text.interface';
import { Text } from './entities/text.entity';
 

@Injectable()
export class TextService {

  constructor(
    @InjectRepository(Text)
    private textRepository: Repository<Text>,
  ) {}
    
  


  create(createTextInterface: TextInterface) {
      const text = this.textRepository.create({
        content: createTextInterface.content,
        language: { id: createTextInterface.languageId },
        ...(createTextInterface.bookId && { book: { id: createTextInterface.bookId } })
      })

      return this.textRepository.save(text)
  }

  findAll() {
    return this.textRepository.find({
      relations: ['language', 'book']
    });
  }

  findOne(id: number) {
    return this.textRepository.findOne({ where: { id }, relations: ['language', 'book'] });
  }

  update(id: number, updateTextDto: any) {
    return this.textRepository.update(id, updateTextDto);
  }

  remove(id: number) {
    return this.textRepository.delete(id);
  }
}

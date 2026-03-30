import { Injectable } from '@nestjs/common';
 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguageDto } from './dto/createLanguageDto.dto';

@Injectable()
export class LanguageService {

  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>
  ) {
 
  }
  
  create(createLanguageDto: CreateLanguageDto) {
    const language = this.languageRepository.create({
      name: createLanguageDto.name,
      code: createLanguageDto.code,
    });
    return this.languageRepository.save(language);
  }

  findAll() {
    return this.languageRepository.find();
  }

  findOne(id: number) {
    return this.languageRepository.findOneBy({ id });
  }

  update(id: number, updateLanguageDto: any) {
    return this.languageRepository.update(id, updateLanguageDto);
  }

  remove(id: number) {
    return this.languageRepository.delete(id);
  }
}

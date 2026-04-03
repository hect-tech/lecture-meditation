import { Injectable } from '@nestjs/common';
 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguageDto, UpdateLanguageDto } from './dto/createLanguageDto.dto';
import { ResponseService } from 'src/common/services/response.service';

@Injectable()
export class LanguageService {

  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>
  ) {
 
  }
  
  async create(createLanguageDto: CreateLanguageDto) {
    const language = this.languageRepository.create({
      name: createLanguageDto.name,
      code: createLanguageDto.code,
    });
    const codeExists = await this.checkLanguageCodeExists(createLanguageDto.code);
    if (codeExists) {
      return ResponseService.badRequest('Cette langue existe déjà');
    }
    const savedLanguage = await this.languageRepository.save(language);
    return ResponseService.created(savedLanguage, 'Langue créée avec succès');
  }

  async findAll() {
    const language = await this.languageRepository.find();
    return ResponseService.success(language, 'Liste de langues récupérées')
  }

  async findOne(id: number) {
    const exist = await this.checkLanguageExists(id);
    if (!exist) {
      return ResponseService.notFound('La langue n\'existe pas');
    }
    const language = await this.languageRepository.findOneBy({ id });
    return ResponseService.success(language, 'Langue trouvée avec succès');
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const exists = await this.checkLanguageExists(id);
    if (!exists) {
      return ResponseService.notFound('La langue n\'existe pas');
    }
    await this.languageRepository.update(id, updateLanguageDto);

    const updatedLanguage = await this.findOne(id);
    return ResponseService.updated(updatedLanguage.data, 'Langue mise à jour avec succès');
  }

  async remove(id: number) {
    // Vérifier d'abord l'existence de la langue
    const exists = await this.checkLanguageExists(id);
    if (!exists) {
      return ResponseService.notFound('La langue n\'existe pas');
    }
    await this.languageRepository.delete(id);

    return ResponseService.deleted('Langue supprimée avec succès');
  }

  async checkLanguageExists(id: number) {
    return this.languageRepository.exists({ where: { id } });
  }

  async checkLanguageCodeExists(code: string) {
    return this.languageRepository.exists({ where: { code } });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyReflection } from './entities/daily-reflection.entity';
import { CreateDailyReflectionDto, UpdateDailyReflectionDto } from './dto/create-daily-reflection.dto';
import { ResponseService } from '../common/services/response.service';

@Injectable()
export class DailyReflectionService {
  constructor(
    @InjectRepository(DailyReflection)
    private dailyReflectionRepository: Repository<DailyReflection>,
  ) {}

  async create(createDto: CreateDailyReflectionDto) {
    const reflection = this.dailyReflectionRepository.create(createDto);
    const saved = await this.dailyReflectionRepository.save(reflection);
    return ResponseService.created(saved, 'Réflexion quotidienne créée avec succès');
  }

  async getTodayReflection() {
    const today = new Date().toISOString().split('T')[0];
    const reflection = await this.dailyReflectionRepository.findOne({
      where: { date: new Date(today) },
      relations: ['relatedText'],
    });

    if (!reflection) {
      return ResponseService.notFound('Aucune réflexion trouvée pour aujourd\'hui');
    }

    return ResponseService.success(reflection, 'Réflexion du jour récupérée avec succès');
  }

  async getByDate(dateString: string) {
    const reflection = await this.dailyReflectionRepository.findOne({
      where: { date: new Date(dateString) },
      relations: ['relatedText'],
    });

    if (!reflection) {
      return ResponseService.notFound(`Aucune réflexion trouvée pour le ${dateString}`);
    }

    return ResponseService.success(reflection, 'Réflexion récupérée avec succès');
  }

  async findAll() {
    const reflections = await this.dailyReflectionRepository.find({
      order: { date: 'DESC' },
    });
    return ResponseService.success(reflections, 'Liste des réflexions récupérée');
  }

  async update(id: number, updateDto: UpdateDailyReflectionDto) {
    await this.dailyReflectionRepository.update(id, updateDto);
    const updated = await this.dailyReflectionRepository.findOne({
      where: { id },
      relations: ['relatedText'],
    });
    return ResponseService.updated(updated, 'Réflexion mise à jour avec succès');
  }

  async remove(id: number) {
    await this.dailyReflectionRepository.delete(id);
    return ResponseService.deleted('Réflexion supprimée avec succès');
  }
}

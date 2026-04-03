import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Devotion } from './entities/devotion.entity';
import { DevotionText } from './entities/devotion-text.entity';
import { CreateDevotionDto } from './dto/create-devotion.dto';
import { CreateDevotionTextDto } from './dto/create-devotion-text.dto';

@Injectable()
export class DevotionService {
  constructor(
    @InjectRepository(Devotion)
    private devotionRepository: Repository<Devotion>,
    @InjectRepository(DevotionText)
    private devotionTextRepository: Repository<DevotionText>,
  ) {}

  // Devotion CRUD
  create(createDevotionDto: CreateDevotionDto) {
    const devotion = this.devotionRepository.create(createDevotionDto);
    return this.devotionRepository.save(devotion);
  }

  findAll() {
    return this.devotionRepository.find({
      relations: ['devotionTexts'],
      order: { date: 'ASC' }
    });
  }

  findOne(id: number) {
    return this.devotionRepository.findOne({
      where: { id },
      relations: ['devotionTexts']
    });
  }

  findByDate(date: Date) {
    return this.devotionRepository.findOne({
      where: { date },
      relations: ['devotionTexts']
    });
  }

  update(id: number, updateDevotionDto: any) {
    return this.devotionRepository.update(id, updateDevotionDto);
  }

  remove(id: number) {
    return this.devotionRepository.delete(id);
  }

  // DevotionText CRUD
  createDevotionText(createDevotionTextDto: CreateDevotionTextDto) {
    const devotionText = this.devotionTextRepository.create(createDevotionTextDto);
    return this.devotionTextRepository.save(devotionText);
  }

  findAllDevotionTexts() {
    return this.devotionTextRepository.find({
      relations: ['devotion', 'text']
    });
  }

  findDevotionTextsByDevotion(devotionId: number) {
    return this.devotionTextRepository.find({
      where: { devotion: { id: devotionId } },
      relations: ['text'],
      order: { displayOrder: 'ASC', moment: 'ASC' }
    });
  }

  updateDevotionText(id: number, updateDevotionTextDto: any) {
    return this.devotionTextRepository.update(id, updateDevotionTextDto);
  }

  removeDevotionText(id: number) {
    return this.devotionTextRepository.delete(id);
  }

  // Lecture du jour
  async getTodayReading(languageCode: string = 'fr') {
    const query = `
      SELECT 
        d.date,
        d.bahai_month,
        d.day,
        dt.moment,
        dt.display_order,
        t.content,
        t.reference,
        a.name AS author,
        b.title AS book,
        l.name AS language_name,
        l.code AS language_code
      FROM devotions d
      JOIN devotion_texts dt ON dt.devotion_id = d.id
      JOIN texts t ON t.id = dt.text_id
      JOIN languages l ON l.id = t.language_id
      LEFT JOIN authors a ON a.id = t.author_id
      LEFT JOIN books b ON b.id = t.book_id
      WHERE d.date = CURRENT_DATE
      AND l.code = $1
      ORDER BY dt.moment, dt.display_order
    `;
    
    return this.devotionRepository.query(query, [languageCode]);
  }

  // Lecture par date spécifique
  async getReadingByDate(date: string, languageCode: string = 'fr') {
    const query = `
      SELECT 
        d.date,
        d.bahai_month,
        d.day,
        dt.moment,
        dt.display_order,
        t.content,
        t.reference,
        a.name AS author,
        b.title AS book,
        l.name AS language_name,
        l.code AS language_code
      FROM devotions d
      JOIN devotion_texts dt ON dt.devotion_id = d.id
      JOIN texts t ON t.id = dt.text_id
      JOIN languages l ON l.id = t.language_id
      LEFT JOIN authors a ON a.id = t.author_id
      LEFT JOIN books b ON b.id = t.book_id
      WHERE d.date = $1
      AND l.code = $2
      ORDER BY dt.moment, dt.display_order
    `;
    
    return this.devotionRepository.query(query, [date, languageCode]);
  }
}

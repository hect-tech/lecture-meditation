import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Devotion } from './entities/devotion.entity';
import { DevotionText } from './entities/devotion-text.entity';
import { CreateDevotionDto } from './dto/create-devotion.dto';
import { CreateDevotionTextDto } from './dto/create-devotion-text.dto';
import { BahaiDateService } from '../bahai-date/bahai-date.service';
import { ResponseService } from '../common/services/response.service';
import { ApiResponse } from '../common/interfaces/response.interface';

@Injectable()
export class DevotionService {
  constructor(
    @InjectRepository(Devotion)
    private devotionRepository: Repository<Devotion>,
    @InjectRepository(DevotionText)
    private devotionTextRepository: Repository<DevotionText>,
    private bahaiDateService: BahaiDateService,
  ) {}

  // Créer une dévotion pour aujourd'hui automatiquement
  async createTodayDevotion(): Promise<ApiResponse<Devotion>> {
    try {
      const bahaiDate = await this.bahaiDateService.createDevotionForToday();
      
      // Utiliser la date locale actuelle au lieu de celle de l'API
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      // console.log('DEBUG: todayString (local):', todayString);
      // console.log('DEBUG: bahaiDate.date (API):', bahaiDate.date);
      
      // Créer la date à minuit UTC pour éviter les problèmes de timezone
      const todayUTC = new Date(todayString + 'T00:00:00Z');
      // console.log('DEBUG: todayUTC (minuit UTC):', todayUTC);
      
      // Vérifier si la dévotion existe déjà avec la date locale
      const existing = await this.findByDate(todayUTC);
      console.log('DEBUG: existing devotion:', existing);
      if (existing) {
        return ResponseService.badRequest('La dévotion du jour existe déjà');
      }

      const devotion = this.devotionRepository.create({
        date: todayUTC,
        bahaiMonth: bahaiDate.bahaiMonth,
        day: bahaiDate.day,
        month: today.getMonth() + 1,
      });

      const savedDevotion = await this.devotionRepository.save(devotion);
      return ResponseService.created(savedDevotion, 'Dévotion du jour créée avec succès');
    } catch (error) {
      return ResponseService.badRequest(`Erreur lors de la création: ${error.message}`);
    }
  }

  // Devotion CRUD
  async create(createDevotionDto: CreateDevotionDto): Promise<ApiResponse<Devotion>> {
    const devotion = this.devotionRepository.create(createDevotionDto);
    const savedDevotion = await this.devotionRepository.save(devotion);
    return ResponseService.created(savedDevotion, 'Dévotion créée avec succès');
  }

  async findAll(): Promise<ApiResponse<Devotion[]>> {
    try {
      const devotions = await this.devotionRepository.find({
        // Pas de relations complexes pour éviter le NaN
        order: { date: 'ASC' }
      });
      return ResponseService.success(devotions, 'Liste des dévotions récupérée');
    } catch (error) {
      return ResponseService.badRequest(`Erreur lors de la récupération: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<ApiResponse<Devotion>> {
    try {
      const devotion = await this.devotionRepository.findOne({
        where: { id }
        // Pas de relations complexes pour éviter le NaN
      });
      
      if (!devotion) {
        return ResponseService.notFound('Dévotion non trouvée');
      }
      
      return ResponseService.success(devotion, 'Dévotion récupérée avec succès');
    } catch (error) {
      return ResponseService.badRequest(`Erreur lors de la récupération: ${error.message}`);
    }
  }

  async findByDate(date: Date): Promise<Devotion | null> {
    // Utiliser une requête simple sans relations complexes
    return this.devotionRepository.findOne({
      where: { 
        date: date // Garder l'objet Date directement
      }
    });
  }

  async update(id: number, updateDevotionDto: any): Promise<ApiResponse<Devotion>> {
    const exists = await this.checkDevotionExists(id);
    if (!exists) {
      return ResponseService.notFound('Dévotion non trouvée');
    }

    await this.devotionRepository.update(id, updateDevotionDto);
    const updated = await this.findOne(id);
    return ResponseService.updated(updated.data, 'Dévotion mise à jour avec succès');
  }

  async remove(id: number): Promise<ApiResponse> {
    const exists = await this.checkDevotionExists(id);
    if (!exists) {
      return ResponseService.notFound('Dévotion non trouvée');
    }

    await this.devotionRepository.delete(id);
    return ResponseService.deleted('Dévotion supprimée avec succès');
  }

  // DevotionText CRUD
  async createDevotionText(createDevotionTextDto: CreateDevotionTextDto): Promise<ApiResponse<DevotionText>> {
    console.log('DEBUG: createDevotionText appelé avec:', createDevotionTextDto);
    
    if (!createDevotionTextDto.devotionId || !createDevotionTextDto.textId) {
      return ResponseService.badRequest('devotionId et textId sont requis');
    }
    
    const devotionText = this.devotionTextRepository.create(createDevotionTextDto);
    const saved = await this.devotionTextRepository.save(devotionText);
    console.log('DEBUG: devotionText sauvegardé:', saved);
    
    // Recharger avec les relations pour avoir les objets complets
    const withRelations = await this.devotionTextRepository.findOne({
      where: { id: saved.id },
      relations: ['devotion', 'text']
    });
    
    console.log('DEBUG: devotionText avec relations:', withRelations);
    return ResponseService.created(withRelations || saved, 'Texte de dévotion créé avec succès');
  }

  async findAllDevotionTexts(): Promise<ApiResponse<DevotionText[]>> {
    try {
      const devotionTexts = await this.devotionTextRepository.find({
        // Pas de relations complexes pour éviter le NaN
        order: { displayOrder: 'ASC', moment: 'ASC' }
      });
      return ResponseService.success(devotionTexts, 'Liste des textes de dévotion récupérée');
    } catch (error) {
      return ResponseService.badRequest(`Erreur lors de la récupération: ${error.message}`);
    }
  }

  async findDevotionTextsByDevotion(devotionId: number): Promise<ApiResponse<DevotionText[]>> {
    try {
      const devotionTexts = await this.devotionTextRepository.find({
        where: { devotion: { id: devotionId } },
        // Pas de relations complexes pour éviter le NaN
        order: { displayOrder: 'ASC', moment: 'ASC' }
      });
      return ResponseService.success(devotionTexts, 'Textes de la dévotion récupérés');
    } catch (error) {
      return ResponseService.badRequest(`Erreur lors de la récupération: ${error.message}`);
    }
  }

  async updateDevotionText(id: number, updateDevotionTextDto: any): Promise<ApiResponse<DevotionText>> {
    try {
      // Vérifier si le texte de dévotion existe
      const exists = await this.devotionTextRepository.exists({ where: { id } });
      if (!exists) {
        return ResponseService.notFound('Texte de dévotion non trouvé');
      }

      await this.devotionTextRepository.update(id, updateDevotionTextDto);
      const updated = await this.devotionTextRepository.findOne({ 
        where: { id }
        // Pas de relations complexes pour éviter le NaN
      });
      
      return ResponseService.updated(updated!, 'Texte de dévotion mis à jour');
    } catch (error) {
      return ResponseService.badRequest(`Erreur lors de la mise à jour: ${error.message}`);
    }
  }

  async removeDevotionText(id: number): Promise<ApiResponse> {
    try {
      // Vérifier si le texte de dévotion existe
      const exists = await this.devotionTextRepository.exists({ where: { id } });
      if (!exists) {
        return ResponseService.notFound('Texte de dévotion non trouvé');
      }

      await this.devotionTextRepository.delete(id);
      return ResponseService.deleted('Texte de dévotion supprimé');
    } catch (error) {
      return ResponseService.badRequest(`Erreur lors de la suppression: ${error.message}`);
    }
  }

  // Lecture du jour
  async getTodayReading(languageCode: string = 'Fr'): Promise<ApiResponse<any>> {
    // Utiliser la date d'aujourd'hui formatée
    const today = new Date().toISOString().split('T')[0];
    // console.log('DEBUG: getTodayReading appelé avec languageCode:', languageCode);
    // console.log('DEBUG: today formaté:', today);
    
    // D'abord vérifier s'il existe une dévotion pour aujourd'hui
    const devotionExists = await this.devotionRepository.findOne({
      where: { date: new Date(today) }
    });
    
    if (!devotionExists) {
      console.log('DEBUG: Aucune dévotion trouvée pour aujourd\'hui');
      return ResponseService.notFound(`Aucune dévotion trouvée pour aujourd\'hui (${today}). Veuillez d'abord créer la dévotion du jour.`);
    }
    
    const query = `
      SELECT 
        d.id as devotion_id,
        TO_CHAR(d.date, 'YYYY-MM-DD') as date,
        d."bahaiMonth",
        d.day,
        dt.id as devotion_text_id,
        dt.moment,
        dt."displayOrder",
        dt."devotionId",
        dt."textId",
        t.content,
        t.reference,
        a.name AS author,
        b.title AS book,
        l.name AS language_name,
        l.code AS language_code
      FROM devotions d 
      INNER JOIN devotion_texts dt ON dt."devotionId" = d.id
        INNER JOIN texts t ON t."id" = dt."textId"
        INNER JOIN languages l ON l."id" = t."languageId"
        LEFT JOIN books b ON b."id" = t."bookId"
        LEFT JOIN authors a ON a."id" = b."authorId"
        WHERE TO_CHAR(d.date, 'YYYY-MM-DD') = $1
        AND l.code = $2
        ORDER BY dt.moment, dt."displayOrder"
    `;
    try {
      // console.log('DEBUG: exécution de la requête SQL avec params:', [today, languageCode]);
      const reading = await this.devotionRepository.query(query, [today, languageCode]);
      // console.log('DEBUG: résultat brut de la requête:', reading);
      
      if (!reading || reading.length === 0) {
        // return ResponseService.notFound('Aucun texte trouvé pour la dévotion du jour dans cette langue', reading);
        return reading;
      }

      return ResponseService.success(reading, 'Devotion du jour retournée avec succès !');
    } catch (error) {
      console.log('DEBUG: erreur SQL complète:', error);
      return ResponseService.badRequest(`Erreur lors de la récupération: ${error.message}`);
    }
  }

  // Lecture par date spécifique
  async getReadingByDate(date: string, languageCode: string = 'fr'): Promise<ApiResponse<any>> {
    const query = `
      SELECT 
        d.date,
        d."bahaiMonth",
        d.day,
        dt.moment,
        dt."displayOrder",
        t.content,
        t.reference,
        a.name AS author,
        b.title AS book,
        l.name AS language_name,
        l.code AS language_code
      FROM devotions d
      INNER JOIN devotion_texts dt ON dt."devotionId" = d.id
      INNER JOIN texts t ON t."id" = dt."textId"
      INNER JOIN languages l ON l."id" = t."languageId"
      LEFT JOIN authors a ON a."id" = t."authorId"
      LEFT JOIN books b ON b."id" = t."bookId"
      WHERE d.date = $1
      AND l.code = $2
      ORDER BY dt.moment, dt."displayOrder"
    `;
    
    try {
      const reading = await this.devotionRepository.query(query, [date, languageCode]);
      
      if (!reading || reading.length === 0) {
        return ResponseService.notFound('Aucune information trouvée pour cette date !');
      }

      return ResponseService.success(reading, `Devotion du ${date} retournée avec succès !`);
    } catch (error) {
      return ResponseService.badRequest(`Erreur lors de la récupération: ${error.message}`);
    }
  }

  // Utilitaires
  async checkDevotionExists(id: number): Promise<boolean> {
    return this.devotionRepository.exists({ where: { id } });
  }

  // Créer une dévotion complète avec textes
  async createCompleteDevotion(textIds: number[], moments: string[] = ['MORNING', 'EVENING']): Promise<ApiResponse<any>> {
    try {
      // 1. Utiliser la dévotion du jour existante ou en créer une nouvelle
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      const todayUTC = new Date(todayString + 'T00:00:00Z');
      
      let devotion = await this.findByDate(todayUTC);
      if (!devotion) {
        // Si pas de dévotion, en créer une
        const createResult = await this.createTodayDevotion();
        if (createResult.code !== 201 || !createResult.data) {
          return createResult;
        }
        devotion = createResult.data;
      }
      
    //   console.log("devotion utilisée:", devotion);
      
      // Vérifier que l'ID est valide
      if (!devotion || !devotion.id) {
        return ResponseService.badRequest('Erreur: ID de dévotion invalide');
      }

      // 2. Ajouter tous les textes à la dévotion
      const devotionTexts = [];
      for (let i = 0; i < textIds.length; i++) {
        const moment = moments[i % moments.length]; // Alterner entre MORNING/EVENING
        console.log('DEBUG: Boucle', i, '- devotion.id:', devotion.id, 'textId:', textIds[i], 'moment:', moment);
        
        const devotionTextResult = await this.createDevotionText({
          devotionId: devotion.id,
          textId: textIds[i],
          moment: moment as any,
          displayOrder: i + 1
        });
        
        if (devotionTextResult.code === 201) {
          devotionTexts.push(devotionTextResult.data);
        }
      }

      return ResponseService.created({
        devotion,
        devotionTexts,
        totalTexts: devotionTexts.length
      }, `Dévotion complète créée avec ${devotionTexts.length} textes`);

    } catch (error) {
      return ResponseService.badRequest(`Erreur lors de la création: ${error.message}`);
    }
  }

  // Ajouter un texte à la dévotion du jour
  async addTextToTodayDevotion(textId: number, moment: string = 'MORNING', displayOrder?: number): Promise<ApiResponse<DevotionText>> {
    try {
      // Récupérer ou créer la dévotion du jour
      const today = new Date().toISOString().split('T')[0];
      let devotion = await this.findByDate(new Date(today));
      
      if (!devotion) {
        // Si pas de dévotion, en créer une
        const createResult = await this.createTodayDevotion();
        if (createResult.code !== 201 || !createResult.data) {
          return ResponseService.badRequest('Impossible de créer la dévotion du jour');
        }
        devotion = createResult.data;
      }

      // Compter les textes existants pour déterminer l'ordre
      const existingCount = await this.devotionTextRepository.count({
        where: { devotion: { id: devotion.id } }
      });

      const devotionText = await this.createDevotionText({
        devotionId: devotion.id,
        textId,
        moment: moment as any,
        displayOrder: displayOrder || existingCount + 1
      });

      return devotionText;

    } catch (error) {
      return ResponseService.badRequest(`Erreur: ${error.message}`);
    }
  }

  async getDevotionByMoment(moment: string): Promise<ApiResponse<any>> {
    try {
      const devotion = await this.getTodayReading('Fr');

      if (devotion.code !== 200) {
        return ResponseService.notFound('Aucune dévotion trouvée pour aujourd\'hui');
      }

      const morning = moment == 'matin' ? 'MORNING': 'EVENING'

      // console.log("information morning",morning)

      const momentData = devotion.data.find((d: any) => d.moment === morning);
      if (!momentData) {
        return ResponseService.notFound(`Aucun texte trouvé pour le moment: ${morning}`);
      }

      return ResponseService.success(momentData, `Dévotion trouvée pour le moment: ${morning}`);
    } catch (error) {
      return ResponseService.badRequest(`Erreur: ${error.message}`);
    }
  }
}

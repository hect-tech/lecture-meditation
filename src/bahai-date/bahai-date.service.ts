import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface BahaiDateResponse {
  message: string;
  badi_date: {
    year: number;
    month: number;
    day: number;
    month_name: string;
    timezone_id: string;
  };
  greg_date: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    timezoneOffset: number;
  };
}

@Injectable()
export class BahaiDateService {
  private readonly baseUrl = 'https://bahai-browser.org';

  constructor(private readonly httpService: HttpService) {}

  async getTodayBahaiDate(): Promise<BahaiDateResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/today`)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Impossible de récupérer la date bahá'í d'aujourd'hui: ${error.message}`);
    }
  }

  async getBahaiDate(date: string): Promise<BahaiDateResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/date?date=${date}`)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Impossible de récupérer la date bahá'í pour ${date}: ${error.message}`);
    }
  }

  async createDevotionForToday(): Promise<{
    date: string;
    bahaiMonth: string;
    day: number;
    bahaiYear: number;
  }> {
    const bahaiDate = await this.getTodayBahaiDate();
    
    // Construire la date grégorienne au format YYYY-MM-DD
    const gregorianDate = new Date(
      bahaiDate.greg_date.year,
      bahaiDate.greg_date.month - 1, // Les mois JS sont 0-based
      bahaiDate.greg_date.day
    ).toISOString().split('T')[0];
    
    return {
      date: gregorianDate,
      bahaiMonth: bahaiDate.badi_date.month_name,
      day: bahaiDate.badi_date.day,
      bahaiYear: bahaiDate.badi_date.year
    };
  }

  async checkIfDevotionExists(date: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/date?date=${date}`)
      );
      return !!response.data;
    } catch (error) {
      return false;
    }
  }

  // Méthode utilitaire pour formater la date
  formatDateForAPI(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  // Formater la date en français
  formatDateFrench(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Paris'
    };
    
    return d.toLocaleDateString('fr-FR', options);
  }

  // Formater la date courte en français
  formatDateShortFrench(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Paris'
    });
  }

  // Méthode pour obtenir les dates d'un mois bahá'í
  async getMonthDates(bahaiYear: number, bahaiMonth: number): Promise<BahaiDateResponse[]> {
    // Cette méthode pourrait être implémentée en appelant plusieurs dates
    // ou en utilisant un endpoint spécifique de l'API si disponible
    const dates: BahaiDateResponse[] = [];
    
    // Pour l'instant, retournons une implémentation simple
    // TODO: Implémenter la logique pour récupérer toutes les dates d'un mois
    return dates;
  }

  // Endpoint utilitaire pour formater une date en français
  async formatDateEndpoint(date: string): Promise<{
    original: string;
    french: string;
    frenchShort: string;
    iso: string;
  }> {
    const dateObj = new Date(date);
    
    return {
      original: date,
      french: this.formatDateFrench(dateObj),
      frenchShort: this.formatDateShortFrench(dateObj),
      iso: dateObj.toISOString()
    };
  }
}

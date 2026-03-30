import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Bienvenue dans l'API Lecture et Méditation des écrits bahai`s";
  }
}

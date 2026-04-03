import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/createBookDto.dto';
import { ResponseService } from '../common/services/response.service';
import { ApiResponse } from '../common/interfaces/response.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<ApiResponse<Book>> {
    const book = this.bookRepository.create({
      title: createBookDto.title,
      author: createBookDto.authorId ? { id: createBookDto.authorId } : null,
    });

    const savedBook = await this.bookRepository.save(book);
    return ResponseService.created(savedBook, 'Livre créé avec succès');
  }

  async findAll(): Promise<ApiResponse<Book[]>> {
    const books = await this.bookRepository.find({
      relations: ['author'],
    });
    return ResponseService.success(books, 'Liste des livres récupérée');
  }

  async findOne(id: number): Promise<ApiResponse<Book>> {
    const book = await this.bookRepository.findOne({ 
      where: { id },
      relations: ['author']
    });
    
    if (!book) {
      return ResponseService.notFound('Livre non trouvé');
    }
    
    return ResponseService.success(book, 'Livre récupéré avec succès');
  }

  async update(id: number, updateBookDto: CreateBookDto): Promise<ApiResponse<Book>> {
    const updateData: any = {
      title: updateBookDto.title
    };
    
    if (updateBookDto.authorId !== undefined) {
      updateData.author = updateBookDto.authorId ? { id: updateBookDto.authorId } : null;
    }
    
    await this.bookRepository.update(id, updateData);

    const exists = await this.checkBookExists(id);
    if (!exists) {
      return ResponseService.notFound('Livre non trouvé');
    }
    
    const updatedBook = await this.findOne(id);
    return ResponseService.updated(updatedBook.data, 'Livre mis à jour avec succès');
  }

  async remove(id: number): Promise<ApiResponse> {
    const exists = await this.checkBookExists(id);
    if (!exists) {
      return ResponseService.notFound('Livre non trouvé');
    }
    await this.bookRepository.delete(id);
    return ResponseService.deleted('Livre supprimé avec succès');
  }

  // Méthodes de lecture avancées
  async findWithTexts(id: number) {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'texts']
    });
  }

  async findByAuthor(authorId: number) {
    return this.bookRepository.find({
      where: { author: { id: authorId } },
      relations: ['author']
    });
  }

  async searchByTitle(title: string) {
    return this.bookRepository.find({
      where: title ? { 
        title: Like(`%${title}%`)
      } : {},
      relations: ['author']
    });
  }

  async getBookStats(id: number) {
    const book = await this.findWithTexts(id);
    if (!book) return null;

    return {
      id: book.id,
      title: book.title,
      author: book.author,
      textCount: book.texts?.length || 0
    };
  }

  // check l'existence d'un livre
  async checkBookExists(id: number): Promise<boolean> {
    return this.bookRepository.exists({ where: { id } });
  }
}

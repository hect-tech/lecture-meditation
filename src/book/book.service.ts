import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/createBookDto.dto';
import { BookInterface } from './interfaces/book.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBook: BookInterface) {
    const book = this.bookRepository.create({
      title: createBook.title,
      author: { id: createBook.authorId },
    });

    console.log('book', book);
    return this.bookRepository.save(book);
  }

  async findAll() {
    return this.bookRepository.find({
      relations: ['author'],
    });
  }

  async findOne(id: number) {
    return this.bookRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBookDto: any) {
    return this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    return this.bookRepository.delete(id);
  }
}

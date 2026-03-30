import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutherInterface } from './interfaces/auther.interface';
import { Author } from './entities/author.entity';
import { AuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorsService {

    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) { }

    create(autor: AutherInterface) {
        const auteurSave = this.authorRepository.create(autor)
        return this.authorRepository.save({
            ...auteurSave
        });
    }


    update(id: string, authorDto: AuthorDto) {
        return this.authorRepository.update(id, authorDto);
    }
    remove(id: string) {
        return this.authorRepository.delete(id);
    }
    findAll() {
        return this.authorRepository.find();
    }
    findOne(id: string) {
        return this.authorRepository.findOne({ where: { id: parseInt(id) } });
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutherInterface } from './interfaces/auther.interface';
import { Author } from './entities/author.entity';
import { AuthorDto } from './dto/author.dto';
import { ResponseService } from 'src/common/services/response.service';

@Injectable()
export class AuthorsService {

    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) { }

    async create(autor: AuthorDto) {
        const auteurSave = this.authorRepository.create(autor)
        const savedAuthor = await this.authorRepository.save({
            ...auteurSave
        });
        return ResponseService.created(savedAuthor, 'Auteur créé avec succès');
    }


    async update(id: string, authorDto: AuthorDto) {

        const exists = await this.checkAuthorExists(parseInt(id));
        if (!exists) {
            return ResponseService.notFound('Auteur non trouvé');
        }
        const updatedAuthor = await this.authorRepository.update(id, authorDto);
        return ResponseService.updated(updatedAuthor, 'Auteur modifié avec succès');
    }
    
    async remove(id: string) {
        const exists = await this.checkAuthorExists(parseInt(id));
        if (!exists) {
            return ResponseService.notFound('Auteur non trouvé');
        }
        await this.authorRepository.delete(id);
        return ResponseService.deleted('Auteur supprimé avec succès');
    }
    
    async findAll() {
        return this.authorRepository.find();
    }
    
    async findOne(id: string) {
        const exists = await this.checkAuthorExists(parseInt(id));
        if (!exists) {
            return ResponseService.notFound('Auteur non trouvé');
        }
        return this.authorRepository.findOne({ where: { id: parseInt(id) } });
    }
    
    // check l'existence d'un auteur
    async checkAuthorExists(id: number): Promise<boolean> {
        return this.authorRepository.exists({ where: { id } });
    }
}

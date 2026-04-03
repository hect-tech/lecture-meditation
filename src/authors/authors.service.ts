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
        await this.authorRepository.update(id, authorDto);

        const updatedAuthor = await this.findOne(id);

        return ResponseService.updated(updatedAuthor.data, 'Auteur modifié avec succès');
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
        const auteur = await this.authorRepository.find();
        return ResponseService.success(auteur, 'Liste des auteurs récupérée');
    }
    
    async findOne(id: string) {
        const exists = await this.checkAuthorExists(parseInt(id));
        if (!exists) {
            return ResponseService.notFound('Auteur non trouvé');
        }
        const auteur = await this.authorRepository.findOne({ where: { id: parseInt(id) } });
        return ResponseService.success(auteur, 'Auteur récupéré');
    }
    
    // check l'existence d'un auteur
    async checkAuthorExists(id: number): Promise<boolean> {
        return this.authorRepository.exists({ where: { id } });
    }
}

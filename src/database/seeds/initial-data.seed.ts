import { Language } from '../../language/entities/language.entity';
import { Author } from '../../authors/entities/author.entity';
import { DataSource } from 'typeorm';

export async function seedData(dataSource: DataSource) {
  // Créer des langues
  const languageRepository = dataSource.getRepository(Language);
  
  const french = await languageRepository.save({
    name: 'Français',
    code: 'fr'
  });
  
  const english = await languageRepository.save({
    name: 'English',
    code: 'en'
  });

  // Créer des auteurs
  const authorRepository = dataSource.getRepository(Author);
  
  await authorRepository.save({
    name: 'Baháʼuʼlláh'
  });
  
  await authorRepository.save({
    name: 'The Báb'
  });

  console.log('Données initiales insérées avec succès !');
}

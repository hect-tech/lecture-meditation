import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateCompleteDevotionDto {
  @ApiProperty({
    description: 'Liste des IDs des textes à inclure dans la dévotion',
    example: [1, 2, 3],
    isArray: true,
    type: 'number'
  })
  @IsArray()
  @IsNumber({}, { each: true })
  textIds: number[];

  @ApiProperty({
    description: 'Moments de la journée pour chaque texte (MATIN, SOIR, etc.)',
    example: ['MORNING', 'EVENING', 'MORNING'],
    isArray: true,
    type: 'string',
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  moments?: string[];
}

export class AddTextToDevotionDto {
  @ApiProperty({
    description: 'ID du texte à ajouter',
    example: 1
  })
  @IsNumber()
  textId: number;

  @ApiProperty({
    description: 'Moment de la journée',
    example: 'MORNING',
    enum: ['MORNING', 'EVENING', 'NOON', 'SPECIAL'],
    required: false
  })
  @IsOptional()
  @IsString()
  moment?: string;

  @ApiProperty({
    description: 'Ordre d\'affichage',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}

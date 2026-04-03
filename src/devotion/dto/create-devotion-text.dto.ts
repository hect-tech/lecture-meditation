import { ApiProperty } from "@nestjs/swagger";
import { DevotionMoment } from "../entities/devotion-text.entity";

export class CreateDevotionTextDto {
  @ApiProperty({ example: 1, description: 'ID de la dévotion' })
  devotionId: number;

  @ApiProperty({ example: 1, description: 'ID du texte' })
  textId: number;

  @ApiProperty({ 
    enum: DevotionMoment, 
    example: DevotionMoment.MORNING, 
    description: 'Moment de la dévotion' 
  })
  moment: DevotionMoment;

  @ApiProperty({ example: 1, description: 'Ordre d\'affichage', default: 0 })
  displayOrder?: number;
}

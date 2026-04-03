import { ApiProperty } from "@nestjs/swagger";
import { DevotionMoment } from "../entities/devotion-text.entity";
import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from "class-validator";

export class CreateDevotionTextDto {
  @ApiProperty({ example: 1, description: 'ID de la dévotion' })
  @IsNotEmpty()
  @IsNumber()
  devotionId: number;

  @ApiProperty({ example: 1, description: 'ID du texte' })
  @IsNotEmpty()
  @IsNumber()
  textId: number;

  @ApiProperty({ 
    enum: DevotionMoment, 
    example: DevotionMoment.MORNING, 
    description: 'Moment de la dévotion' 
  })
  @IsEnum(DevotionMoment)
  moment: DevotionMoment;

  @ApiProperty({ example: 1, description: 'Ordre d\'affichage', default: 0 })
  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}

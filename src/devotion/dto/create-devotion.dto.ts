import { ApiProperty } from "@nestjs/swagger";

export class CreateDevotionDto {
  @ApiProperty({ example: '2026-04-03', description: 'Date de la dévotion' })
  date: Date;

  @ApiProperty({ example: 'Jamál', description: 'Mois baháʼí' })
  bahaiMonth: string;

  @ApiProperty({ example: 3, description: 'Numéro du jour' })
  day: number;

  @ApiProperty({ example: 1, description: 'Chiffre du mois baháʼí' })
  month: number;
}

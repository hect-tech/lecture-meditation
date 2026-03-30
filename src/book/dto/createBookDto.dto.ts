import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
import { ApiProperty } from "@nestjs/swagger";

export class createTextDto {
  @ApiProperty({required: true})
  content: string;
  
  @ApiProperty({required: true})
  languageId: number;
  
  @ApiProperty({required: true})
  bookId: number;
}

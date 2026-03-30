import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty()
  @IsString()
  name: string;
}

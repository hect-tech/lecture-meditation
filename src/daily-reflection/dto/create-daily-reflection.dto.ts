import { ApiProperty } from '@nestjs/swagger';

export class CreateDailyReflectionDto {
  @ApiProperty()
  date: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  introduction?: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  quote?: string;
  @ApiProperty()
  quoteAuthor?: string;
  @ApiProperty()
  description?: string
  @ApiProperty()
  theme?: string;
  @ApiProperty()
  readTime?: number;
  @ApiProperty()
  closingImageUrl?: string;
  @ApiProperty()
  closingText?: string;
  @ApiProperty()
  reflectionPrompts?: string[];
  @ApiProperty()
  relatedTextId?: number;
}

export class UpdateDailyReflectionDto {
  @ApiProperty()
  title?: string;
  @ApiProperty()
  introduction?: string;
  @ApiProperty()
  content?: string;
  @ApiProperty()
  quote?: string;
  @ApiProperty()
  description?: string
  @ApiProperty()
  quoteAuthor?: string;
  @ApiProperty()
  theme?: string;
  @ApiProperty()
  readTime?: number;
  @ApiProperty()
  closingImageUrl?: string;
  @ApiProperty()
  closingText?: string;
  @ApiProperty()
  reflectionPrompts?: string[];
  @ApiProperty()
  relatedTextId?: number;
}

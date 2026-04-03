import { ApiProperty } from "@nestjs/swagger";

export class CreateLanguageDto {
    @ApiProperty({required: true})
    name: string;
    
    @ApiProperty({required: true})
    code: string;
}

export class UpdateLanguageDto {
    @ApiProperty({required: false})
    name?: string;
    
    @ApiProperty({required: false})
    code?: string;
}


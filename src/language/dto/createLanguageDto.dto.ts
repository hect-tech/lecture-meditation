import { ApiProperty } from "@nestjs/swagger";

export class CreateLanguageDto {
    @ApiProperty({required: true})
    name: string;
    
    @ApiProperty({required: true})
    code: string;
}

import { ArrayMinSize, IsArray } from 'class-validator';

export class AddSpecialtiesDto {
  @IsArray()
  @ArrayMinSize(1)
  especialidades: string[];
}

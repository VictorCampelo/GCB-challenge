import { ArrayMinSize, IsArray, IsNotEmpty, MaxLength } from 'class-validator';

export class FindSpecialtyDto {
  @IsNotEmpty({
    message: 'Please add the names of the specialties to be searched for.',
  })
  @IsArray()
  @ArrayMinSize(1)
  especialidades: string[];
}

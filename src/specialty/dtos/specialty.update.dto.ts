import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateSpecialtyDto {
  @IsNotEmpty({
    message: 'Please add the new specialty name.',
  })
  @MaxLength(255, {
    message: 'The specialty name must contain up to 255 characters.',
  })
  nome: string;
}

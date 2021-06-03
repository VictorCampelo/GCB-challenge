import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSpecialtyDto {
  @IsNotEmpty({
    message: 'Please add the name of the specialty.',
  })
  @MaxLength(255, {
    message: 'The specialty name must contain up to 255 characters.',
  })
  nome: string;
}

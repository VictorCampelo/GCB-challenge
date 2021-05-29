import { MaxLength } from 'class-validator';

export class UpdateSpecialtyDto {
  @MaxLength(255, {
    message: 'O nome da especialidade deve conter até 255 caracteres',
  })
  nome: string;
}

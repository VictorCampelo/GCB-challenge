import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateSpecialtyDto {
  @IsNotEmpty({
    message: 'Por favor, adicione o novo nome da especialidade.',
  })
  @MaxLength(255, {
    message: 'O nome da especialidade deve conter até 255 caracteres',
  })
  nome: string;
}

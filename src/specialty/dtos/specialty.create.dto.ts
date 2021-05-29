import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSpecialtyDto {
  @IsNotEmpty({
    message: 'Por favor, adicione o nome da especialidade.',
  })
  @MaxLength(255, {
    message: 'O nome da especialidade deve conter até 255 caracteres',
  })
  nome: string;
}

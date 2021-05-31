import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty({
    message: 'Por favor, adicione o nome do médico.',
  })
  @MaxLength(120, {
    message: 'O nome do médico deve conter até 120 caracteres',
  })
  nome: string;

  @IsNotEmpty({
    message: 'Por favor, adicione o CRM do médico.',
  })
  @MaxLength(7, {
    message: 'O CRM do médico deve conter até 7 caracteres',
  })
  crm: string;

  @IsNumberString({ no_symbols: true })
  @IsNotEmpty({
    message: 'Por favor, adicione o número fixo do médico.',
  })
  @MaxLength(13, {
    message: 'O número fixo do médico deve conter até 13 dígitos',
  })
  telefone_fixo: string;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  @MaxLength(13, {
    message: 'O número do celular do médico deve conter até 13 dígitos',
  })
  telefone_celular: string;

  @IsNumberString({ no_symbols: true })
  @IsNotEmpty({
    message: 'Por favor, adicione o CEP do médico.',
  })
  @MaxLength(8, {
    message: 'O CEP do médico deve conter até 8 dígitos',
  })
  cep: string;

  @IsNotEmpty({
    message: 'Por favor, adicione as especialidades do médico.',
  })
  @IsArray()
  @ArrayMinSize(2)
  especialidade: string[];
}

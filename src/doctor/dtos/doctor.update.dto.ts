import { MaxLength, IsArray, IsNumberString } from 'class-validator';
import { Specialty } from 'src/specialty/specialty.entity';

export class UpdateDoctorDto {
  @MaxLength(120, {
    message: 'O nome do médico deve conter até 120 caracteres',
  })
  nome: string;

  @MaxLength(7, {
    message: 'O CRM do médico deve conter até 7 caracteres',
  })
  crm: string;

  @IsNumberString({ no_symbols: true })
  @MaxLength(13, {
    message: 'O número fixo do médico deve conter até 13 dígitos',
  })
  telefone_fixo: string;

  @IsNumberString({ no_symbols: true })
  @MaxLength(13, {
    message: 'O número do celular do médico deve conter até 13 dígitos',
  })
  telefone_celular: string;

  @IsNumberString({ no_symbols: true })
  @MaxLength(8, {
    message: 'O CEP do médico deve conter até 8 dígitos',
  })
  cep: string;

  @IsArray()
  especialidade: string[];
}

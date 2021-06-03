import { IsNumberString, IsOptional, MaxLength } from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @MaxLength(120, {
    message: 'O nome do médico deve conter até 120 caracteres',
  })
  nome: string;

  @IsOptional()
  @MaxLength(7, {
    message: 'O CRM do médico deve conter até 7 caracteres',
  })
  crm: string;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
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

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  @MaxLength(8, {
    message: 'O CEP do médico deve conter até 8 dígitos',
  })
  cep: string;

  @IsOptional()
  logradouro: string;

  @IsOptional()
  complemento: string;

  @IsOptional()
  bairro: string;

  @IsOptional()
  cidade: string;

  @IsOptional()
  estado: string;

  @IsOptional()
  ibge: string;

  @IsOptional()
  gia: string;

  @IsOptional()
  ddd: string;

  @IsOptional()
  siafi: string;
}

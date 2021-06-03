import { IsNumberString, IsOptional, MaxLength } from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @MaxLength(120, {
    message: "The doctor's name must be up to 120 characters",
  })
  nome: string;

  @IsNumberString({ no_symbols: true })
  @IsOptional()
  @MaxLength(7, {
    message: "The doctor's CRM must contain up to 7 characters",
  })
  crm: string;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  @MaxLength(13, {
    message: "The doctor's fixed number must contain up to 13 digits",
  })
  telefone_fixo: string;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  @MaxLength(13, {
    message:
      'The mobile phone number of the doctor must contain up to 13 digits',
  })
  telefone_celular: string;

  @IsOptional()
  @IsNumberString({ no_symbols: true })
  @MaxLength(8, {
    message: "The doctor's CEP code must contain up to 8 digits",
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

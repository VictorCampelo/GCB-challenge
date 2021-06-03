import { IsNumberString } from 'class-validator';

export class FindDoctorDto {
  id?: string;

  nome?: string;

  @IsNumberString({ no_symbols: true })
  crm?: string;

  @IsNumberString({ no_symbols: true })
  telefone_fixo?: string;

  @IsNumberString({ no_symbols: true })
  telefone_celular?: string;

  @IsNumberString({ no_symbols: true })
  cep?: string;

  logradouro?: string;

  complemento?: string;

  bairro?: string;

  cidade?: string;

  estado?: string;

  ibge?: string;

  gia?: string;

  ddd?: string;

  siafi?: string;

  especialidades?: string[];
}

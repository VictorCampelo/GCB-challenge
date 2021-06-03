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
    message: 'Please add the name of the doctor.',
  })
  @MaxLength(120, {
    message: "The doctor's name must be up to 120 characters",
  })
  nome: string;

  @IsNumberString({ no_symbols: true })
  @IsNotEmpty({
    message: "Please add the doctor's CRM.",
  })
  @MaxLength(7, {
    message: "The doctor's CRM must contain up to 7 characters",
  })
  crm: string;

  @IsNumberString({ no_symbols: true })
  @IsNotEmpty({
    message: "Please add the doctor's landline number.",
  })
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

  @IsNumberString({ no_symbols: true })
  @IsNotEmpty({
    message: "Please add the doctor's CEP code.",
  })
  @MaxLength(8, {
    message: "The doctor's CEP code must contain up to 8 digits",
  })
  cep: string;

  @IsNotEmpty({
    message: "Please add the doctor's specialties.",
  })
  @IsArray()
  @ArrayMinSize(2)
  especialidade: string[];
}

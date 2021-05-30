import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, In, Repository } from 'typeorm';
import { CreateDoctorDto } from './dtos/doctor.create.dto';
import { Doctor } from './doctor.entity';
import { Specialty } from 'src/specialty/specialty.entity';

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> {
  /**
   * Creates doctor
   * @param createDoctorDto
   * @returns doctor
   */
  async createDoctor(
    createDoctorDto: CreateDoctorDto,
    address: any,
  ): Promise<Doctor> {
    const { nome, crm, telefone_fixo, telefone_celular, especialidade, cep } =
      createDoctorDto;

    const {
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      ibge,
      gia,
      ddd,
      siafi,
    } = address;

    const specialtys = await getRepository(Specialty).find({
      where: { nome: In(especialidade) },
    });

    const doctor = this.create();

    doctor.nome = nome;
    doctor.crm = crm;
    doctor.telefone_fixo = telefone_fixo;
    doctor.telefone_celular = telefone_celular;
    doctor.cep = cep;
    doctor.logradouro = logradouro;
    doctor.complemento = complemento;
    doctor.bairro = bairro;
    doctor.cidade = localidade;
    doctor.estado = uf;
    doctor.ibge = ibge;
    doctor.gia = gia;
    doctor.ddd = ddd;
    doctor.siafi = siafi;
    doctor.especialidades = specialtys;

    try {
      await doctor.save();
      return doctor;
    } catch (error) {
      //E11000 duplicate key error collection
      if (error.code === 11000) {
        throw new ConflictException('CRM já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar os dados do médico no banco de dados: ' + error,
        );
      }
    }
  }
}

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Specialty } from 'src/specialty/specialty.entity';
import { EntityRepository, getRepository, In, Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dtos/doctor.create.dto';
import { FindDoctorDto } from './dtos/doctor.find.dto';

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

  async findDoctors(queryDto: FindDoctorDto): Promise<Doctor[]> {
    const query = this.createQueryBuilder('doctor');

    query.leftJoinAndSelect('doctor.especialidades', 'especialidade');

    query.select([
      'doctor.id',
      'doctor.nome',
      'doctor.crm',
      'doctor.telefone_fixo',
      'doctor.telefone_celular',
      'doctor.cep',
      'doctor.logradouro',
      'doctor.complemento',
      'doctor.bairro',
      'doctor.cidade',
      'doctor.estado',
      'doctor.ibge',
      'doctor.gia',
      'doctor.ddd',
      'doctor.siafi',
      'especialidade.nome',
    ]);

    let flag = false;

    if (queryDto.nome) {
      query.where('doctor.nome ILIKE :nome', { nome: `%${queryDto.nome}%` });
      flag = true;
    }
    if (queryDto.crm) {
      if (flag) {
        query.andWhere('doctor.crm ILIKE :crm', { crm: `%${queryDto.crm}%` });
      } else {
        query.where('doctor.crm ILIKE :crm', { crm: `%${queryDto.crm}%` });
        flag = true;
      }
    }

    if (queryDto.cep) {
      if (flag) {
        query.andWhere('doctor.cep ILIKE :cep', { cep: `%${queryDto.cep}%` });
      } else {
        query.where('doctor.cep ILIKE :cep', { cep: `%${queryDto.cep}%` });
        flag = true;
      }
    }
    if (queryDto.telefone_fixo) {
      if (flag) {
        query.andWhere('doctor.telefone_fixo ILIKE :telefone_fixo', {
          telefone_fixo: `%${queryDto.telefone_fixo}%`,
        });
      } else {
        query.where('doctor.telefone_fixo ILIKE :telefone_fixo', {
          telefone_fixo: `%${queryDto.telefone_fixo}%`,
        });
        flag = true;
      }
    }
    if (queryDto.telefone_celular) {
      if (flag) {
        query.andWhere('doctor.crm ILIKE :telefone_celular', {
          telefone_celular: `%${queryDto.telefone_celular}%`,
        });
      } else {
        query.where('doctor.telefone_celular ILIKE :telefone_celular', {
          telefone_celular: `%${queryDto.telefone_celular}%`,
        });
        flag = true;
      }
    }
    if (queryDto.bairro) {
      if (flag) {
        query.andWhere('doctor.bairro ILIKE :bairro', {
          bairro: `%${queryDto.bairro}%`,
        });
      } else {
        query.where('doctor.bairro ILIKE :bairro', {
          bairro: `%${queryDto.bairro}%`,
        });
        flag = true;
      }
    }
    if (queryDto.cidade) {
      if (flag) {
        query.andWhere('doctor.cidade ILIKE :cidade', {
          cidade: `%${queryDto.cidade}%`,
        });
      } else {
        query.where('doctor.cidade ILIKE :cidade', {
          cidade: `%${queryDto.cidade}%`,
        });
        flag = true;
      }
    }
    if (queryDto.estado) {
      if (flag) {
        query.andWhere('doctor.estado ILIKE :estado', {
          estado: `%${queryDto.estado}%`,
        });
      } else {
        query.where('doctor.estado ILIKE :estado', {
          estado: `%${queryDto.estado}%`,
        });
        flag = true;
      }
    }
    if (queryDto.logradouro) {
      if (flag) {
        query.andWhere('doctor.logradouro ILIKE :logradouro', {
          logradouro: `%${queryDto.logradouro}%`,
        });
      } else {
        query.where('doctor.logradouro ILIKE :logradouro', {
          crlogradourom: `%${queryDto.logradouro}%`,
        });
        flag = true;
      }
    }
    if (queryDto.complemento) {
      if (flag) {
        query.andWhere('doctor.complemento ILIKE :complemento', {
          complemento: `%${queryDto.complemento}%`,
        });
      } else {
        query.where('doctor.complemento ILIKE :complemento', {
          complemento: `%${queryDto.complemento}%`,
        });
        flag = true;
      }
    }
    if (queryDto.ddd) {
      if (flag) {
        query.andWhere('doctor.ddd ILIKE :ddd', { ddd: `%${queryDto.ddd}%` });
      } else {
        query.where('doctor.ddd ILIKE :ddd', { ddd: `%${queryDto.ddd}%` });
        flag = true;
      }
    }
    if (queryDto.ibge) {
      if (flag) {
        query.andWhere('doctor.ibge ILIKE :ibge', {
          ibge: `%${queryDto.ibge}%`,
        });
      } else {
        query.where('doctor.ibge ILIKE :ibge', { ibge: `%${queryDto.ibge}%` });
        flag = true;
      }
    }
    if (queryDto.gia) {
      if (flag) {
        query.andWhere('doctor.gia ILIKE :gia', { gia: `%${queryDto.gia}%` });
      } else {
        query.where('doctor.gia ILIKE :gia', { gia: `%${queryDto.gia}%` });
        flag = true;
      }
    }
    if (queryDto.siafi) {
      if (flag) {
        query.andWhere('doctor.siafi ILIKE :siafi', {
          siafi: `%${queryDto.siafi}%`,
        });
      } else {
        query.where('doctor.siafi ILIKE :siafi', {
          siafi: `%${queryDto.siafi}%`,
        });
        flag = true;
      }
    }
    if (queryDto.especialidades) {
      console.log(queryDto.especialidades);
      const listSpecialties = [];

      try {
        queryDto.especialidades.forEach((element) => {
          listSpecialties.push('%' + element + '%');
        });
      } catch (error) {
        listSpecialties.push('%' + queryDto.especialidades + '%');
      }

      console.log(queryDto.especialidades.length);

      if (flag) {
        query.andWhere('especialidade.nome ILIKE ANY(ARRAY[:...nomes])', {
          nomes: listSpecialties,
        });
      } else {
        query.where('especialidade.nome ILIKE ANY (ARRAY[:...nomes])', {
          nomes: listSpecialties,
        });
        flag = true;
      }
    }

    return await query.getMany();
  }
}

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
      if (error.code === 11000) {
        throw new ConflictException('CRM is already in use');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  /**
   * Find doctors
   * @param findDoctorDto
   * @returns list of doctors
   */
  async findDoctors(findDoctorDto: FindDoctorDto): Promise<Doctor[]> {
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

    this.queryBuilder(findDoctorDto, query);

    try {
      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private queryBuilder(findDoctorDto: FindDoctorDto, query) {
    let flag = false;

    if (findDoctorDto.nome) {
      query.where('doctor.nome ILIKE :nome', {
        nome: `%${findDoctorDto.nome}%`,
      });
      flag = true;
    }
    if (findDoctorDto.crm) {
      if (flag) {
        query.andWhere('doctor.crm ILIKE :crm', {
          crm: `%${findDoctorDto.crm}%`,
        });
      } else {
        query.where('doctor.crm ILIKE :crm', { crm: `%${findDoctorDto.crm}%` });
        flag = true;
      }
    }

    if (findDoctorDto.cep) {
      if (flag) {
        query.andWhere('doctor.cep ILIKE :cep', {
          cep: `%${findDoctorDto.cep}%`,
        });
      } else {
        query.where('doctor.cep ILIKE :cep', { cep: `%${findDoctorDto.cep}%` });
        flag = true;
      }
    }
    if (findDoctorDto.telefone_fixo) {
      if (flag) {
        query.andWhere('doctor.telefone_fixo ILIKE :telefone_fixo', {
          telefone_fixo: `%${findDoctorDto.telefone_fixo}%`,
        });
      } else {
        query.where('doctor.telefone_fixo ILIKE :telefone_fixo', {
          telefone_fixo: `%${findDoctorDto.telefone_fixo}%`,
        });
        flag = true;
      }
    }
    if (findDoctorDto.telefone_celular) {
      if (flag) {
        query.andWhere('doctor.crm ILIKE :telefone_celular', {
          telefone_celular: `%${findDoctorDto.telefone_celular}%`,
        });
      } else {
        query.where('doctor.telefone_celular ILIKE :telefone_celular', {
          telefone_celular: `%${findDoctorDto.telefone_celular}%`,
        });
        flag = true;
      }
    }
    if (findDoctorDto.bairro) {
      if (flag) {
        query.andWhere('doctor.bairro ILIKE :bairro', {
          bairro: `%${findDoctorDto.bairro}%`,
        });
      } else {
        query.where('doctor.bairro ILIKE :bairro', {
          bairro: `%${findDoctorDto.bairro}%`,
        });
        flag = true;
      }
    }
    if (findDoctorDto.cidade) {
      if (flag) {
        query.andWhere('doctor.cidade ILIKE :cidade', {
          cidade: `%${findDoctorDto.cidade}%`,
        });
      } else {
        query.where('doctor.cidade ILIKE :cidade', {
          cidade: `%${findDoctorDto.cidade}%`,
        });
        flag = true;
      }
    }
    if (findDoctorDto.estado) {
      if (flag) {
        query.andWhere('doctor.estado ILIKE :estado', {
          estado: `%${findDoctorDto.estado}%`,
        });
      } else {
        query.where('doctor.estado ILIKE :estado', {
          estado: `%${findDoctorDto.estado}%`,
        });
        flag = true;
      }
    }
    if (findDoctorDto.logradouro) {
      if (flag) {
        query.andWhere('doctor.logradouro ILIKE :logradouro', {
          logradouro: `%${findDoctorDto.logradouro}%`,
        });
      } else {
        query.where('doctor.logradouro ILIKE :logradouro', {
          crlogradourom: `%${findDoctorDto.logradouro}%`,
        });
        flag = true;
      }
    }
    if (findDoctorDto.complemento) {
      if (flag) {
        query.andWhere('doctor.complemento ILIKE :complemento', {
          complemento: `%${findDoctorDto.complemento}%`,
        });
      } else {
        query.where('doctor.complemento ILIKE :complemento', {
          complemento: `%${findDoctorDto.complemento}%`,
        });
        flag = true;
      }
    }
    if (findDoctorDto.ddd) {
      if (flag) {
        query.andWhere('doctor.ddd ILIKE :ddd', {
          ddd: `%${findDoctorDto.ddd}%`,
        });
      } else {
        query.where('doctor.ddd ILIKE :ddd', { ddd: `%${findDoctorDto.ddd}%` });
        flag = true;
      }
    }
    if (findDoctorDto.ibge) {
      if (flag) {
        query.andWhere('doctor.ibge ILIKE :ibge', {
          ibge: `%${findDoctorDto.ibge}%`,
        });
      } else {
        query.where('doctor.ibge ILIKE :ibge', {
          ibge: `%${findDoctorDto.ibge}%`,
        });
        flag = true;
      }
    }
    if (findDoctorDto.gia) {
      if (flag) {
        query.andWhere('doctor.gia ILIKE :gia', {
          gia: `%${findDoctorDto.gia}%`,
        });
      } else {
        query.where('doctor.gia ILIKE :gia', { gia: `%${findDoctorDto.gia}%` });
        flag = true;
      }
    }
    if (findDoctorDto.siafi) {
      if (flag) {
        query.andWhere('doctor.siafi ILIKE :siafi', {
          siafi: `%${findDoctorDto.siafi}%`,
        });
      } else {
        query.where('doctor.siafi ILIKE :siafi', {
          siafi: `%${findDoctorDto.siafi}%`,
        });
        flag = true;
      }
    }
    if (findDoctorDto.especialidades) {
      const listSpecialties = [];

      try {
        findDoctorDto.especialidades.forEach((element) => {
          listSpecialties.push('%' + element + '%');
        });
      } catch (error) {
        listSpecialties.push('%' + findDoctorDto.especialidades + '%');
      }

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
  }
}

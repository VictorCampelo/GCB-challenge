import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSpecialtyDto } from './dtos/specialty.create.dto';
import { Specialty } from './specialty.entity';
import { Repository } from 'typeorm';
import { UpdateSpecialtyDto } from './dtos/specialty.update.dto';
import { AddSpecialtiesDto } from 'src/doctor/dtos/doctor.add-specialties.dto';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) {}

  /**
   * Creates specialty service
   * @param createSpecialtyDto
   * @returns created specialty
   */
  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
    const specialty = this.specialtyRepository.create(createSpecialtyDto);

    try {
      await specialty.save();
      return specialty;
    } catch (error) {
      //E11000 duplicate key error collection
      console.log(error.code);
      if (error.code === '23505') {
        throw new ConflictException('Especialidade já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar os dados da especialidade no banco de dados: ' +
            error,
        );
      }
    }
  }

  async findAll(): Promise<Specialty[]> {
    return await this.specialtyRepository.find();
  }

  async findSpecialtyById(id: string): Promise<Specialty> {
    const specialty = await this.specialtyRepository.findOne(id);

    if (!specialty) throw new NotFoundException('Especialidade não encontrado');

    return specialty;
  }

  async findSpecialtybyName(
    addSpecialtiesDto: AddSpecialtiesDto,
  ): Promise<Specialty[]> {
    let specialtyList;
    try {
      specialtyList = await this.specialtyRepository
        .createQueryBuilder('specialty')
        .where('specialty.nome IN (:...names)', {
          names: addSpecialtiesDto.especialidades,
        })
        .getMany();
    } catch (error) {
      throw new NotFoundException(`Specialties not found. Details: ${error}`);
    }
    return specialtyList;
  }

  async update(
    id: string,
    updateSpecialtyDto: UpdateSpecialtyDto,
  ): Promise<Specialty> {
    const result = await this.specialtyRepository.update(
      { id },
      updateSpecialtyDto,
    );
    if (result.affected > 0) {
      const specialty = await this.findSpecialtyById(id);
      return specialty;
    } else {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.specialtyRepository.softDelete(id);
    if (result.affected > 0) {
      return { message: 'Especialidade Removida temporariamente' };
    } else {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}

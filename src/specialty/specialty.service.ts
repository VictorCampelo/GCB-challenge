import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialtyDto } from './dtos/specialty.create.dto';
import { FindSpecialtyDto } from './dtos/specialty.find.dto';
import { UpdateSpecialtyDto } from './dtos/specialty.update.dto';
import { Specialty } from './specialty.entity';

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
    let specialty;
    try {
      specialty = this.specialtyRepository.create(createSpecialtyDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    try {
      await specialty.save();
      return specialty;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Specialty is already registered');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  /**
   * Finds all
   * @returns list of all specialties
   */
  async findAll(): Promise<Specialty[]> {
    let specialties;
    try {
      specialties = await this.specialtyRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!specialties) throw new NotFoundException('Specialties not found');

    return specialties;
  }

  /**
   * Finds specialty by id
   * @param id
   * @returns specialty by id
   */
  async findSpecialtyById(id: string): Promise<Specialty> {
    let specialty;
    try {
      specialty = await this.specialtyRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!specialty) throw new NotFoundException('Specialty not found');

    return specialty;
  }

  /**
   * Finds specialties by name
   * @param findSpecialtyDto
   * @returns specialties by name
   */
  async findSpecialtybyName(
    findSpecialtyDto: FindSpecialtyDto,
  ): Promise<Specialty[]> {
    try {
      return await this.specialtyRepository
        .createQueryBuilder('specialty')
        .where('specialty.nome ILIKE ANY(ARRAY[:...names])', {
          names: findSpecialtyDto.especialidades,
        })
        .getMany();
    } catch (error) {
      throw new NotFoundException(`Specialties not found. Details: ${error}`);
    }
  }

  /**
   * Updates specialty service
   * @param id
   * @param updateSpecialtyDto
   * @returns Specialty
   */
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
      throw new NotFoundException('Specialty not found');
    }
  }

  /**
   * Deletes specialty service
   * @param id
   * @returns message
   */
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.specialtyRepository.softDelete(id);
    if (result.affected > 0) {
      return { message: 'Specialty Temporarily Removed' };
    } else {
      throw new NotFoundException('Specialty not found');
    }
  }
}

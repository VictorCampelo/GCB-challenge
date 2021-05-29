import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSpecialtyDto } from './dtos/specialty.create.dto';
import { Specialty } from './specialty.entity';
import { Repository } from 'typeorm';

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
    return this.specialtyRepository.create(createSpecialtyDto);
  }
}

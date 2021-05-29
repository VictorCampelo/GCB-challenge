import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dtos/doctor.create.dto';
import { Doctor } from './doctor.entity';
import { DoctorRepository } from './doctor.repository';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorRepository)
    private doctorRepository: DoctorRepository,
  ) {}

  /**
   * Creates doctor service
   * @param createDoctorDto
   * @returns created doctor
   */
  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorRepository.createDoctor(createDoctorDto);
  }
}

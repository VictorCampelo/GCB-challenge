import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dtos/doctor.create.dto';
import { Doctor } from './doctor.entity';
import { DoctorRepository } from './doctor.repository';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorRepository)
    private doctorRepository: DoctorRepository,
    private httpService: HttpService,
  ) {}

  /**
   * Creates doctor service
   * @param createDoctorDto
   * @returns created doctor
   */
  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const address = await this.getLocationByCep(createDoctorDto.cep);
    return this.doctorRepository.createDoctor(createDoctorDto, address);
  }

  private async getLocationByCep(cep: string) {
    return await this.httpService
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}

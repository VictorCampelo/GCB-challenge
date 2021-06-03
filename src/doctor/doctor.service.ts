import {
  HttpService,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from 'src/specialty/specialty.entity';
import { Doctor } from './doctor.entity';
import { DoctorRepository } from './doctor.repository';
import { CreateDoctorDto } from './dtos/doctor.create.dto';
import { FindDoctorDto } from './dtos/doctor.find.dto';
import { UpdateDoctorDto } from './dtos/doctor.update.dto';

type Doctors = Promise<Doctor[]>;

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorRepository)
    private doctorRepository: DoctorRepository,
    // @InjectRepository(Specialty)
    // private specialtyRepository: Repository<Specialty>,
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

  /**
   * Find all doctors service
   * @returns list of doctors
   */
  async findAll(): Doctors {
    return this.doctorRepository.find();
  }

  /**
   * Finds a doctor by id
   * @param id
   * @returns doctor
   */
  async findDoctor(id: string): Promise<Doctor> {
    return this.doctorRepository.findOne(id, { relations: ['specialty'] });
  }

  /**
   * Finds a doctor by attributes
   * @param id
   * @returns list of doctors
   */
  async findDoctorAttr(findDoctorDto: FindDoctorDto): Promise<Doctors> {
    return this.doctorRepository.findDoctors(findDoctorDto);
  }

  /**
   * Updates doctor service
   * @param id
   * @param updateDoctorDto
   * @returns updated doctor
   */
  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    if (updateDoctorDto.cep) {
      const address = await this.getLocationByCep(updateDoctorDto.cep);

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

      updateDoctorDto.logradouro = logradouro;
      updateDoctorDto.complemento = complemento;
      updateDoctorDto.bairro = bairro;
      updateDoctorDto.cidade = localidade;
      updateDoctorDto.estado = uf;
      updateDoctorDto.ibge = ibge;
      updateDoctorDto.gia = gia;
      updateDoctorDto.ddd = ddd;
      updateDoctorDto.siafi = siafi;

      await this.doctorRepository.update(id, updateDoctorDto);

      return await this.doctorRepository.findOne(id, {
        relations: ['especialidades'],
      });
    }
  }

  /**
   * Soft Delete doctor service
   * @param id
   * @returns message
   */
  async delete(id: string): Promise<{ message: string }> {
    try {
      await this.doctorRepository.softDelete(id);
      return { message: 'successfully deleted' };
    } catch (error) {
      throw new NotFoundException(`Doctor not found. Details: ${error}`);
    }
  }

  /**
   * Restore doctor service
   * @param id
   * @returns message
   */
  async restore(id: string): Promise<{ message: string; doctor: Doctor }> {
    try {
      await this.doctorRepository.restore(id);
      const doctor = await this.doctorRepository.findOne(id, {
        relations: ['especialidades'],
      });
      return { message: 'successfully restored', doctor };
    } catch (error) {
      throw new NotFoundException(`Doctor not found. Details: ${error}`);
    }
  }

  /**
   * Adds specialties
   * @param id
   * @param specialties
   * @returns message
   */
  async addSpecialties(
    id: string,
    specialties: Specialty[],
  ): Promise<{ message: string; doctor: Doctor }> {
    let doctor;
    try {
      doctor = await this.doctorRepository.findOne(id, {
        relations: ['especialidades'],
      });
    } catch (error) {
      throw new NotFoundException(`Doctor not found. Details: ${error}`);
    }
    specialties.forEach((element) => {
      doctor.especialidades.push(element);
    });

    try {
      doctor.save();
      doctor = await this.doctorRepository.findOne(id, {
        relations: ['especialidades'],
      });
      return { message: 'successfully added new specialties', doctor };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes specialties
   * @param id
   * @param specialties
   * @returns message
   */
  async removeSpecialties(
    id: string,
    specialties: Specialty[],
  ): Promise<{ message: string; doctor: Doctor }> {
    let doctor;
    try {
      doctor = await this.doctorRepository.findOne(id, {
        relations: ['especialidades'],
      });
    } catch (error) {
      throw new NotFoundException(`Doctor not found. Details: ${error}`);
    }
    specialties.forEach((element) => {
      doctor.especialidades = doctor.especialidades.filter((specialty) => {
        return specialty.nome !== element.nome;
      });
    });

    try {
      doctor.save();
      doctor = await this.doctorRepository.findOne(id, {
        relations: ['especialidades'],
      });
      return { message: 'successfully removed specialties', doctor };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Gets location by cep
   * @param cep
   * @returns location by cep
   */
  private async getLocationByCep(cep: string): Promise<any> {
    return await this.httpService
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .toPromise()
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err);
        throw err;
      });
  }
}

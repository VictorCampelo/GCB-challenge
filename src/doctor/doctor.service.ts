import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
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
  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
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

      return this.doctorRepository.update(id, updateDoctorDto);
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
  async restore(id: string): Promise<{ message: string }> {
    try {
      await this.doctorRepository.restore(id);
      return { message: 'successfully restored' };
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
  ): Promise<{ message: string }> {
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

    doctor.save();

    return { message: 'successfully added new specialties' };
  }

  /**
   * Removes specialties
   * @param id
   * @param specialties
   * @returns message
   */
  async removeSpecialties(id: string, specialties: Specialty[]) {
    // let specialtyList;
    // try {
    //   specialtyList = await this.specialtyRepository
    //     .createQueryBuilder('specialty')
    //     .where('specialty.nome IN (:...names)', { names: specialties })
    //     .getMany();
    // } catch (error) {
    //   throw new NotFoundException(`Specialties not found. Details: ${error}`);
    // }
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

    doctor.save();

    return { message: 'successfully removed specialties' };
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

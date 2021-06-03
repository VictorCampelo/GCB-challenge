import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindSpecialtyDto } from 'src/specialty/dtos/specialty.find.dto';
import { SpecialtyService } from 'src/specialty/specialty.service';
import { Doctor } from './doctor.entity';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dtos/doctor.create.dto';
import { FindDoctorDto } from './dtos/doctor.find.dto';
import { UpdateDoctorDto } from './dtos/doctor.update.dto';

@ApiTags('Doctor')
@Controller('doctors')
export class DoctorController {
  constructor(
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
  ) {}

  /**
   * Posts doctors controller
   * @param createDoctorDto
   * @returns doctor
   */
  @Post('/create')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(201)
  async createDoctor(
    @Body(new ValidationPipe({ transform: true }))
    createDoctorDto: CreateDoctorDto,
  ): Promise<Doctor> {
    return await this.doctorService.create(createDoctorDto);
  }

  /**
   * Gets doctor controller
   * @param id
   * @returns doctor
   */
  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  async findDoctor(@Param('id') id: string): Promise<Doctor> {
    return await this.doctorService.findDoctor(id);
  }

  /**
   * Gets all doctors controller
   * @returns doctors
   */
  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  async findallDoctorsByAttr(
    @Query() findDoctorDto: FindDoctorDto,
  ): Promise<Doctor[]> {
    return await this.doctorService.findDoctorAttr(findDoctorDto);
  }

  /**
   * Puts doctors controller
   * @param id
   * @param updateDoctorDto
   * @returns doctor
   */
  @Put('/edit/:id')
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  async editDoctor(
    @Param('id') id: string,
    @Body(ValidationPipe) updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    return await this.doctorService.update(id, updateDoctorDto);
  }

  /**
   * Deletes doctor controller
   * @param id
   * @returns
   */
  @Delete('/delete/:id')
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteDoctor(@Param('id') id: string): Promise<{ message: string }> {
    return await this.doctorService.delete(id);
  }

  /**
   * Restore a deleted doctor controller
   * @param id
   * @returns
   */
  @Post('/restore/:id')
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  async retoreDoctor(
    @Param('id') id: string,
  ): Promise<{ message: string; doctor: Doctor }> {
    return await this.doctorService.restore(id);
  }

  /**
   * Add new specialty to the doctor
   * @param id
   * @param specialties
   * @returns
   */
  @Post('/add-specialties/:id')
  @HttpCode(201)
  @UseInterceptors(ClassSerializerInterceptor)
  async addSpecialties(
    @Param('id') id: string,
    @Body(ValidationPipe) findSpecialtyDto: FindSpecialtyDto,
  ): Promise<{ message: string }> {
    const specialtyList = await this.specialtyService.findSpecialtybyName(
      findSpecialtyDto,
    );
    return await this.doctorService.addSpecialties(id, specialtyList);
  }

  /**
   * Deletes specialty from the doctor
   * @param id
   * @param specialties
   * @returns
   */
  @Delete('/remove-specialties/:id')
  @HttpCode(201)
  @UseInterceptors(ClassSerializerInterceptor)
  async removeSpecialties(
    @Param('id') id: string,
    @Body(ValidationPipe) findSpecialtyDto: FindSpecialtyDto,
  ): Promise<{ message: string; doctor: any }> {
    const specialtyList = await this.specialtyService.findSpecialtybyName(
      findSpecialtyDto,
    );
    return await this.doctorService.removeSpecialties(id, specialtyList);
  }
}

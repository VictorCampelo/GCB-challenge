import { ApiTags } from '@nestjs/swagger';
import { CreateDoctorDto } from './dtos/doctor.create.dto';
import { Doctor } from './doctor.entity';
import { DoctorService } from './doctor.service';
import {
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Body,
  ValidationPipe,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { UpdateDoctorDto } from './dtos/doctor.update.dto';
import { FindDoctorDto } from './dtos/doctor.find.dto';

@ApiTags('Doctor')
@Controller('doctors')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

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
  async findallDoctors(): Promise<Doctor[]> {
    return await this.doctorService.findAll();
  }

  /**
   * Gets all doctors controller
   * @returns doctors
   */
  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  async findallDoctorsByAttr(
    @Body(new ValidationPipe({ transform: true }))
    findDoctorDto: FindDoctorDto,
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
  ) {
    return await this.doctorService.update(id, updateDoctorDto);
  }
}

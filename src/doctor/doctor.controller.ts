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
} from '@nestjs/common';

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
}

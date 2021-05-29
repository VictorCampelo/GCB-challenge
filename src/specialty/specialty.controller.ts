import { ApiTags } from '@nestjs/swagger';
import { CreateSpecialtyDto } from './dtos/specialty.create.dto';
import { Specialty } from './specialty.entity';
import { SpecialtyService } from './specialty.service';
import {
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Body,
  ValidationPipe,
} from '@nestjs/common';

@ApiTags('Specialty')
@Controller('specialtys')
export class SpecialtyController {
  constructor(private specialtyService: SpecialtyService) {}

  /**
   * Posts specialtys controller
   * @param createSpecialtyDto
   * @returns specialty
   */
  @Post('/create')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(201)
  async createSpecialty(
    @Body(new ValidationPipe({ transform: true }))
    createSpecialtyDto: CreateSpecialtyDto,
  ): Promise<Specialty> {
    return await this.specialtyService.create(createSpecialtyDto);
  }
}

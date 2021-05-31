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
  Delete,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { UpdateSpecialtyDto } from './dtos/specialty.update.dto';

@ApiTags('Specialty')
@Controller('specialties')
export class SpecialtyController {
  constructor(private specialtyService: SpecialtyService) {}

  /**
   * Posts specialties controller
   * @param createSpecialtyDto
   * @returns created specialty
   */
  @Post('/create')
  @HttpCode(201)
  async createSpecialty(
    @Body(new ValidationPipe({ transform: true }))
    createSpecialtyDto: CreateSpecialtyDto,
  ): Promise<Specialty> {
    return await this.specialtyService.create(createSpecialtyDto);
  }

  /**
   * Gets all specialties controller
   * @returns list of all specialties
   */
  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  async showSpecialties(): Promise<any[]> {
    return await this.specialtyService.findAll();
  }

  /**
   * Puts specialties controller
   * @param id
   * @param updateSpecialtyDto
   * @returns updated specialty
   */
  @Put('/edit/:id')
  @HttpCode(200)
  async editSpecialty(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSpecialtyDto: UpdateSpecialtyDto,
  ): Promise<Specialty> {
    return await this.specialtyService.update(id, updateSpecialtyDto);
  }

  /**
   * Deletes specialties controller
   * @param id
   * @returns message
   */
  @Delete('/delete/:id')
  @HttpCode(200)
  async deleteSpecialty(@Param('id') id: string): Promise<string> {
    return await this.specialtyService.delete(id);
  }
}

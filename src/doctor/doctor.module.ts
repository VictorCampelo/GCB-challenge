import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from 'src/specialty/specialty.entity';
import { SpecialtyService } from 'src/specialty/specialty.service';
import { DoctorController } from './doctor.controller';
import { DoctorRepository } from './doctor.repository';
import { DoctorService } from './doctor.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    TypeOrmModule.forFeature([DoctorRepository, Specialty]),
  ],
  providers: [DoctorService, SpecialtyService],
  controllers: [DoctorController],
})
export class DoctorModule {}

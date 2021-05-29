import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from './doctor.controller';
import { DoctorRepository } from './doctor.repository';
import { DoctorService } from './doctor.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorRepository])],
  providers: [DoctorService],
  controllers: [DoctorController],
})
export class DoctorModule {}

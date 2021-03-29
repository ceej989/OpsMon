import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentRepository } from './department.repository';
import { DepartmentService } from './department.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentRepository])],
  providers: [DepartmentService],
})
export class DepartmentModule {}

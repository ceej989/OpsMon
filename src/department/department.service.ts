import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';

@Injectable()
export class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}
}

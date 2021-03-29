import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Department } from '../department/department.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Department, (department) => department.id)
  department: Department;

  @Column()
  isManager: boolean;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;
}

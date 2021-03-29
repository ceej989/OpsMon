import { Department } from 'src/department/department.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()

export class Approval {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne( () => Department, (department) => department.id)
    departmentID: Department;

    @ManyToOne( () => User, (user) => user.id)
    userID: User;

    @Column()
    approvedOn: Date;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;
}
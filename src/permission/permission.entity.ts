import { Application } from 'src/application/application.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()

export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne( ()=> Application, (application) => application.id )
    applicationID: Application;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;
}
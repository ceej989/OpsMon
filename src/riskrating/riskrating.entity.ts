import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class RiskRating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
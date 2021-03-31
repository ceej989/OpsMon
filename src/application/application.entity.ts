import { RiskRating } from "src/riskrating/riskrating.entity";
import { RiskRatingRepository } from "src/riskrating/riskrating.repository";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(()=> RiskRating, (riskrating) => riskrating.id)
    riskRatingID: RiskRating;

    @Column()
    totalLicenses: number;

    @Column()
    activationDate: Date;

    @Column()
    decommissionDate: Date;

    @CreateDateColumn()
    createdAt;

    @Column()
    createdBy: string;

    @UpdateDateColumn()
    updatedAt;

    @Column()
    updatedBy: string;
}
import { EntityRepository, Repository } from "typeorm";
import { RiskRating } from "./riskrating.entity";

@EntityRepository(RiskRating)
export class RiskRatingRepository extends Repository<RiskRating> {}
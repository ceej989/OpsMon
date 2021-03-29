import { Injectable } from '@nestjs/common';
import { RiskRatingRepository } from './riskrating.repository';

@Injectable()
export class RiskratingService {
    constructor(private riskRatingRepository: RiskRatingRepository){}
}

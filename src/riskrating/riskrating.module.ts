import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskRatingRepository } from './riskrating.repository';
import { RiskratingService } from './riskrating.service';

@Module({
  imports: [TypeOrmModule.forFeature([RiskRatingRepository])],
  providers: [RiskratingService]
})
export class RiskratingModule {}

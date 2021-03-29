import { Test, TestingModule } from '@nestjs/testing';
import { RiskratingService } from './riskrating.service';

describe('RiskratingService', () => {
  let service: RiskratingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskratingService],
    }).compile();

    service = module.get<RiskratingService>(RiskratingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

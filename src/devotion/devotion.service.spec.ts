import { Test, TestingModule } from '@nestjs/testing';
import { DevotionService } from './devotion.service';

describe('DevotionService', () => {
  let service: DevotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevotionService],
    }).compile();

    service = module.get<DevotionService>(DevotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

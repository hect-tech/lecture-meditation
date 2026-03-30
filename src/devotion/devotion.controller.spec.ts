import { Test, TestingModule } from '@nestjs/testing';
import { DevotionController } from './devotion.controller';

describe('DevotionController', () => {
  let controller: DevotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevotionController],
    }).compile();

    controller = module.get<DevotionController>(DevotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

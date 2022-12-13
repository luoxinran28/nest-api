import { Test, TestingModule } from '@nestjs/testing';
import { StationsController } from './stations.controller';

describe('Stations Controller', () => {
  let gateway: StationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationsController],
    }).compile();

    gateway = module.get<StationsController>(StationsController);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

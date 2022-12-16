import { Test, TestingModule } from '@nestjs/testing';
import { StationGateway } from './station.gateway';

describe('StationGateway', () => {
  let gateway: StationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationGateway],
    }).compile();

    gateway = module.get<StationGateway>(StationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

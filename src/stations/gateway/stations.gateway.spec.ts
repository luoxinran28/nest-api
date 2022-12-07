import { Test, TestingModule } from '@nestjs/testing';
import { StationsGateway } from './stations.gateway';

describe('GatewayGateway', () => {
  let gateway: StationsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationsGateway],
    }).compile();

    gateway = module.get<StationsGateway>(StationsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

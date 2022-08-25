import { Test, TestingModule } from '@nestjs/testing';
import { ShuffleHelper } from './shuffle.helper';

describe('ShuffleService', () => {
  let service: ShuffleHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShuffleHelper],
    }).compile();

    service = module.get<ShuffleHelper>(ShuffleHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CardFactoryService } from './card-factory.service';

describe('CardFactoryService', () => {
  let service: CardFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardFactoryService],
    }).compile();

    service = module.get<CardFactoryService>(CardFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

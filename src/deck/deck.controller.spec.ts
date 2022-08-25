import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Deck, DeckType } from '@prisma/client';
import { CardModule } from '../card/card.module';
import { CardFactoryService } from '../card/card.factory.service';
import { DeckCompleteness } from '../constants';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';
import { PrismaModule } from '../prisma/prisma.module';

const MOCK_FULL_DECK: {
  deck: Deck;
  cardsCount: number;
} = {
  deck: {
    id: 1,
    uuid: 'full-uuid-123124',
    shuffled: true,
    type: DeckType.STANDARD,
  },
  cardsCount: 52,
};

const MOCK_SHORT_DECK: {
  deck: Deck;
  cardsCount: number;
} = {
  deck: {
    id: 2,
    uuid: 'short-uuid-123124',
    shuffled: false,
    type: DeckType.STRIPPED,
  },
  cardsCount: 32,
};

describe('DeckController', () => {
  let controller: DeckController;
  let deckService: DeckService;
  let saveSpy: jest.SpyInstance<
    Promise<{
      deck: Deck;
      cardsCount: number;
    }>,
    [
      {
        isFull: boolean;
        isShuffled: boolean;
      },
    ]
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeckController],
      providers: [ConfigService, DeckService, CardFactoryService],
      imports: [
        CardModule,
        PrismaModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    controller = module.get<DeckController>(DeckController);
    deckService = module.get<DeckService>(DeckService);
    saveSpy = jest
      .spyOn(deckService, 'save')
      .mockImplementation(
        ({ isFull }) =>
          new Promise<{ deck: Deck; cardsCount: number }>((resolve) =>
            resolve(isFull ? MOCK_FULL_DECK : MOCK_SHORT_DECK),
          ),
      );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a full shuffled deck of cards', async () => {
    const createResponse = await controller.create({
      shuffled: true,
      type: DeckCompleteness.FULL,
    });

    expect(createResponse).toEqual({
      shuffled: true,
      type: DeckCompleteness.FULL,
      deckId: MOCK_FULL_DECK.deck.uuid,
      remaining: MOCK_FULL_DECK.cardsCount,
    });

    expect(saveSpy).toBeCalledWith({
      isFull: true,
      isShuffled: true,
    });
  });

  it('should create a short unshuffled deck of cards', async () => {
    const createResponse = await controller.create({
      shuffled: false,
      type: DeckCompleteness.SHORT,
    });

    expect(createResponse).toEqual({
      shuffled: false,
      type: DeckCompleteness.SHORT,
      deckId: MOCK_SHORT_DECK.deck.uuid,
      remaining: MOCK_SHORT_DECK.cardsCount,
    });

    expect(saveSpy).toBeCalledWith({
      isFull: false,
      isShuffled: false,
    });
  });
});

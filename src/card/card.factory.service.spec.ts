import { Test, TestingModule } from '@nestjs/testing';
import { Rank, Suit } from '@prisma/client';
import { CardFactoryService } from './card.factory.service';

const STRIPPED_DECK = [
  { rank: Rank.F7, suit: Suit.SPADES },
  { rank: Rank.F7, suit: Suit.CLUBS },
  { rank: Rank.F7, suit: Suit.HEARTS },
  { rank: Rank.F7, suit: Suit.DIAMONDS },
  { rank: Rank.F8, suit: Suit.SPADES },
  { rank: Rank.F8, suit: Suit.CLUBS },
  { rank: Rank.F8, suit: Suit.HEARTS },
  { rank: Rank.F8, suit: Suit.DIAMONDS },
  { rank: Rank.F9, suit: Suit.SPADES },
  { rank: Rank.F9, suit: Suit.CLUBS },
  { rank: Rank.F9, suit: Suit.HEARTS },
  { rank: Rank.F9, suit: Suit.DIAMONDS },
  { rank: Rank.F10, suit: Suit.SPADES },
  { rank: Rank.F10, suit: Suit.CLUBS },
  { rank: Rank.F10, suit: Suit.HEARTS },
  { rank: Rank.F10, suit: Suit.DIAMONDS },
  { rank: Rank.JACK, suit: Suit.SPADES },
  { rank: Rank.JACK, suit: Suit.CLUBS },
  { rank: Rank.JACK, suit: Suit.HEARTS },
  { rank: Rank.JACK, suit: Suit.DIAMONDS },
  { rank: Rank.QUEEN, suit: Suit.SPADES },
  { rank: Rank.QUEEN, suit: Suit.CLUBS },
  { rank: Rank.QUEEN, suit: Suit.HEARTS },
  { rank: Rank.QUEEN, suit: Suit.DIAMONDS },
  { rank: Rank.KING, suit: Suit.SPADES },
  { rank: Rank.KING, suit: Suit.CLUBS },
  { rank: Rank.KING, suit: Suit.HEARTS },
  { rank: Rank.KING, suit: Suit.DIAMONDS },
  { rank: Rank.ACE, suit: Suit.SPADES },
  { rank: Rank.ACE, suit: Suit.CLUBS },
  { rank: Rank.ACE, suit: Suit.HEARTS },
  { rank: Rank.ACE, suit: Suit.DIAMONDS },
];

const STANDARD_DECK = [
  { rank: Rank.F2, suit: Suit.SPADES },
  { rank: Rank.F2, suit: Suit.CLUBS },
  { rank: Rank.F2, suit: Suit.HEARTS },
  { rank: Rank.F2, suit: Suit.DIAMONDS },
  { rank: Rank.F3, suit: Suit.SPADES },
  { rank: Rank.F3, suit: Suit.CLUBS },
  { rank: Rank.F3, suit: Suit.HEARTS },
  { rank: Rank.F3, suit: Suit.DIAMONDS },
  { rank: Rank.F4, suit: Suit.SPADES },
  { rank: Rank.F4, suit: Suit.CLUBS },
  { rank: Rank.F4, suit: Suit.HEARTS },
  { rank: Rank.F4, suit: Suit.DIAMONDS },
  { rank: Rank.F5, suit: Suit.SPADES },
  { rank: Rank.F5, suit: Suit.CLUBS },
  { rank: Rank.F5, suit: Suit.HEARTS },
  { rank: Rank.F5, suit: Suit.DIAMONDS },
  { rank: Rank.F6, suit: Suit.SPADES },
  { rank: Rank.F6, suit: Suit.CLUBS },
  { rank: Rank.F6, suit: Suit.HEARTS },
  { rank: Rank.F6, suit: Suit.DIAMONDS },
  ...STRIPPED_DECK,
];

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

  it('should generate standard deck', () => {
    const deck = service.generate(true);
    expect(deck).toEqual(STANDARD_DECK);
  });

  it('should generate stripped deck', () => {
    const deck = service.generate(false);
    expect(deck).toEqual(STRIPPED_DECK);
  });
});

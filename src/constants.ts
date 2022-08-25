import { Rank, Suit } from '@prisma/client';

export const SUIT_SHORT_NAMES = new Map<Suit, string>([
  [Suit.CLUBS, 'C'],
  [Suit.DIAMONDS, 'D'],
  [Suit.HEARTS, 'H'],
  [Suit.SPADES, 'S'],
]);


export enum DeckCompleteness {
  FULL = 'FULL',
  SHORT = 'SHORT',
}

export const RANK_SHORT_NAMES = new Map<Rank, string>([
  [Rank.F2, '2'],
  [Rank.F3, '3'],
  [Rank.F4, '4'],
  [Rank.F5, '5'],
  [Rank.F6, '6'],
  [Rank.F7, '7'],
  [Rank.F8, '8'],
  [Rank.F9, '9'],
  [Rank.F10, '10'],
  [Rank.ACE, 'A'],
  [Rank.JACK, 'J'],
  [Rank.KING, 'K'],
  [Rank.QUEEN, 'Q'],
]);

export const STRIPPED_RANKS: Rank[] = [
  Rank.F2,
  Rank.F3,
  Rank.F4,
  Rank.F5,
  Rank.F6,
];

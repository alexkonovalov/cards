import { Rank, Suit } from '@prisma/client';
import { CardDto } from 'src/deck/deck.dto';

const NUMBER_RANKS: Rank[] = [
  Rank.F2,
  Rank.F3,
  Rank.F4,
  Rank.F5,
  Rank.F6,
  Rank.F7,
  Rank.F8,
  Rank.F9,
  Rank.F10,
];

const suitMap = new Map<Suit, string>([
  [Suit.CLUBS, 'C'],
  [Suit.DIAMONDS, 'D'],
  [Suit.HEARTS, 'H'],
  [Suit.SPADES, 'S'],
]);

const rankMap = new Map<Rank, string>([
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

export const getCardCode = (suit: Suit, rank: Rank) => {
  return `${rankMap.get(rank)}${suitMap.get(suit)}`;
};

export const getCardValue = (rank: Rank): string => {
  return NUMBER_RANKS.includes(rank) ? rankMap.get(rank)! : rank;
};

export const buildCardDto = ({
  suit,
  rank,
}: {
  suit: Suit;
  rank: Rank;
}): CardDto => ({
  value: getCardValue(rank),
  code: getCardCode(suit, rank),
  suit: Suit[suit],
});

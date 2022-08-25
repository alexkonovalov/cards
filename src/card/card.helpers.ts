import { Rank, Suit } from '@prisma/client';
import { CardDto } from '../card/card.dto';
import { RANK_SHORT_NAMES, SUIT_SHORT_NAMES } from '../constants';

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

export const getCardCode = (suit: Suit, rank: Rank) => {
  return `${RANK_SHORT_NAMES.get(rank)}${SUIT_SHORT_NAMES.get(suit)}`;
};

export const getCardValue = (rank: Rank): string => {
  return NUMBER_RANKS.includes(rank) ? RANK_SHORT_NAMES.get(rank)! : rank;
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

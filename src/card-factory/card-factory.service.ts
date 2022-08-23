import { Injectable } from '@nestjs/common';
import { Card, Rank, Suit } from '@prisma/client';

const STRIPPED_RANKS: Rank[] = [Rank.F2, Rank.F3, Rank.F4, Rank.F5, Rank.F6];

@Injectable()
export class CardFactoryService {
  generate(isFull: boolean) {
    const cards: Pick<Card, 'value' | 'suit'>[] = [];

    Object.values(Rank)
      .filter((rank) => isFull || !STRIPPED_RANKS.includes(rank))
      .forEach((rank) => {
        Object.values(Suit).forEach((suit) => {
          cards.push({ value: rank, suit });
        });
      });

    return cards;
  }
}

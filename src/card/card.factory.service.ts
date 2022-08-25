import { Injectable } from '@nestjs/common';
import { Card, Rank, Suit } from '@prisma/client';
import { STRIPPED_RANKS } from '../constants';

@Injectable()
export class CardFactoryService {
  generate(isFull: boolean) {
    const cards: Pick<Card, 'rank' | 'suit'>[] = [];

    Object.values(Rank)
      .filter((rank) => isFull || !STRIPPED_RANKS.includes(rank))
      .forEach((rank) => {
        Object.values(Suit).forEach((suit) => {
          cards.push({ rank, suit });
        });
      });

    return cards;
  }
}

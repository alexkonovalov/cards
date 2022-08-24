import { Injectable } from '@nestjs/common';
import { Card, Completeness, Rank, Suit } from '@prisma/client';
import { CardFactoryService } from 'src/card-factory/card-factory.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { shuffle } from 'src/utils/shuffle/shuffle.helper';
import { DeckDto } from './deck.dto';

@Injectable()
export class DeckService {
  constructor(
    private cardFactoryService: CardFactoryService,
    private prisma: PrismaService,
  ) {}

  async save({ type, shuffled }: DeckDto) {
    const cards = this.cardFactoryService.generate(type === 'FULL');

    const deck = await this.prisma.deck.create({
      data: {
        cards: {
          create: [...(shuffled ? shuffle(cards) : cards)],
        },
        type: Completeness.FULL,
        shuffled: shuffled,
      },
    });
    return deck;
  }

  async get({ uuid }: { uuid: string }) {
    const deck = await this.prisma.deck.findFirst({
      where: { uuid },
      include: { cards: true },
    });

    return deck;
  }
}

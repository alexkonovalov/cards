import { Injectable } from '@nestjs/common';
import { Card, Completeness, Deck, Prisma, Rank, Suit } from '@prisma/client';
import { CardFactoryService } from 'src/card-factory/card-factory.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { shuffle } from 'src/utils/shuffle/shuffle.helper';
import { DeckRequestDto } from './deck.dto';

@Injectable()
export class DeckService {
  constructor(
    private cardFactoryService: CardFactoryService,
    private prisma: PrismaService,
  ) {}

  async save({ type, shuffled }: DeckRequestDto) {
    const completeness =
      type === 'FULL' ? Completeness.FULL : Completeness.SHORT;
    const cards = this.cardFactoryService.generate(
      completeness === Completeness.FULL,
    ); //todo improve

    const deck = await this.prisma.deck.create({
      data: {
        cards: {
          create: [...(shuffled ? shuffle(cards) : cards)],
        },
        type: completeness,
        shuffled: shuffled,
      },
    });
    return { deck, cardsCount: cards.length };
  }

  async get({ uuid }: { uuid: string }) {
    const deck = await this.prisma.deck.findFirst({
      where: { uuid },
      include: { cards: true },
    });

    return deck;
  }

  async draw({ uuid, count }: { uuid: string; count: number }) {
    const cards = await this.prisma.card.findMany({
      where: { deck: { uuid } },
      orderBy: { id: 'desc' },
      take: count,
    });

    await this.prisma.card.deleteMany({
      where: { id: { in: cards.map(({ id }) => id) } },
    });

    return cards;
  }
}

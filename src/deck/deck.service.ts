import { Injectable } from '@nestjs/common';
import { DeckType } from '@prisma/client';
import { CardFactoryService } from '../card/card.factory.service';
import { PrismaService } from '../prisma/prisma.service';
import { shuffle } from '../utils/shuffle/shuffle.helper';

@Injectable()
export class DeckService {
  constructor(
    private cardFactoryService: CardFactoryService,
    private prisma: PrismaService,
  ) {}

  async save({ isFull, isShuffled }: { isFull: boolean; isShuffled: boolean }) {
    const type = isFull ? DeckType.STANDARD : DeckType.STRIPPED;
    const cards = this.cardFactoryService.generate(type === DeckType.STANDARD);

    const deck = await this.prisma.deck.create({
      data: {
        cards: {
          create: [...(isShuffled ? shuffle(cards) : cards)],
        },
        type: type,
        shuffled: isShuffled,
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

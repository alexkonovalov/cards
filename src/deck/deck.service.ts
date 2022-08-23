import { Injectable } from '@nestjs/common';
import { Completeness, Rank, Suit } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeckDto } from './deck.dto';

@Injectable()
export class DeckService {
  constructor(private prisma: PrismaService) {}

  async save(dto: DeckDto) {
    const deck = await this.prisma.deck.create({
      data: {
        cards: {
          create: [
            { value: Rank.F10, suit: Suit.CLUBS },
            { value: Rank.ACE, suit: Suit.DIAMONDS },
          ],
        },
        type: Completeness.FULL,
        shuffled: dto.shuffled,
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

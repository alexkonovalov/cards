import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DeckCompleteness } from '../constants';
import { buildCardDto } from '../card/card.helpers';
import {
  DeckRequestDto,
  DeckFullResponseDto,
  DeckResponseDto,
  DrawRequestDto,
} from './deck.dto';
import { DeckService } from './deck.service';
import { DeckType } from '@prisma/client';

@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Get('open/:uuid')
  async open(@Param('uuid') uuid: string) {
    const deck = await this.deckService.get({ uuid });

    if (deck === null) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The deck is not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const cards = deck.cards.map(({ suit, rank }) =>
      buildCardDto({ suit, rank }),
    );

    const response: DeckFullResponseDto = {
      deckId: deck.uuid,
      type:
        deck.type === DeckType.STANDARD
          ? DeckCompleteness.FULL
          : DeckCompleteness.SHORT,

      shuffled: deck.shuffled,
      remaining: cards.length,
      cards,
    };

    return response;
  }

  @Post('create')
  async create(@Body() { shuffled, type }: DeckRequestDto) {
    const { deck, cardsCount } = await this.deckService.save({
      isFull: type === DeckCompleteness.FULL,
      isShuffled: shuffled,
    });

    const deckResponse: DeckResponseDto = {
      shuffled: deck.shuffled,
      type:
        deck.type === DeckType.STANDARD
          ? DeckCompleteness.FULL
          : DeckCompleteness.SHORT,
      deckId: deck.uuid,
      remaining: cardsCount,
    };

    return deckResponse;
  }

  @Put('draw/:uuid/')
  async draw(@Param('uuid') uuid: string, @Body() { count }: DrawRequestDto) {
    const cards = (await this.deckService.draw({ uuid, count })).map(
      ({ suit, rank }) => buildCardDto({ suit, rank }),
    );
    return { cards };
  }
}

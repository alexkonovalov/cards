import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Card, Suit } from '@prisma/client';
import { CardFactoryService } from 'src/card-factory/card-factory.service';
import { getCardCode, getCardValue } from 'src/utils/card.helpers';
import {
  DeckRequestDto,
  DeckFullResponseDto,
  DeckResponseDto,
} from './deck.dto';
import { DeckService } from './deck.service';

@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}
  @Get('open/:uuid')
  async open(@Param() params) {
    const uuid = params.uuid;
    console.log('uuid', { uuid });
    const deck = await this.deckService.get({ uuid });
    console.log('deck_cards:::', deck.cards);
    const cards = deck.cards.map((card) => ({
      value: getCardValue(card.value),
      code: getCardCode(card.suit, card.value),
      suit: Suit[card.suit],
    }));

    const response: DeckFullResponseDto = {
      deckId: deck.uuid,
      type: deck.type,
      shuffled: deck.shuffled,
      remaining: cards.length,
      cards,
    };

    return response;
  }

  @Post('create')
  async create(@Body() req: DeckRequestDto) {
    console.log('------------', { req });
    console.log('req+++', { req });

    const { deck, cardsCount } = await this.deckService.save(req);
    console.log('deck from db !!!!!!!!!!!!!!!!!');
    console.log('deck', deck);

    const deckResponse: DeckResponseDto = {
      shuffled: deck.shuffled,
      type: deck.type,
      deckId: deck.uuid,
      remaining: cardsCount,
    };

    return deckResponse;
  }
}

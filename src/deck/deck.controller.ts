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
import {
  buildCardDto,
  getCardCode,
  getCardValue,
} from 'src/utils/card.helpers';
import {
  DeckRequestDto,
  DeckFullResponseDto,
  DeckResponseDto,
  DrawRequestDto,
} from './deck.dto';
import { DeckService } from './deck.service';

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
    const cards = deck.cards.map(({ suit, value }) =>
      buildCardDto({ suit, rank: value }),
    );

    console.log('deck', deck);

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

  @Put('draw/:uuid/')
  async draw(@Param('uuid') uuid: string, @Body() body: DrawRequestDto) {
    return (await this.deckService.draw({ uuid, count: body.count })).map(
      ({ suit, value }) => buildCardDto({ suit, rank: value }),
    );
  }
}

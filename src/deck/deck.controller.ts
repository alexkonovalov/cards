import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Card } from '@prisma/client';
import { CardFactoryService } from 'src/card-factory/card-factory.service';
import { DeckDto } from './deck.dto';
import { DeckService } from './deck.service';

@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}
  @Get('open/:uuid')
  async open(@Param() params) {
    const uuid = params.uuid;
    console.log('uuid', { uuid });
    const deck = await this.deckService.get({ uuid });
    return deck;
  }

  @Post('create')
  async create(@Body() req: DeckDto) {
    console.log('------------', { req });
    console.log('req+++', { req });

    const deck = await this.deckService.save(req);
    console.log('deck from db !!!!!!!!!!!!!!!!!');
    console.log('deck', deck);
    return `deck creaddted: ${deck.uuid}`;
  }
}

import { Controller, Get, Post } from '@nestjs/common';

@Controller('deck')
export class DeckController {
  @Get('open')
  open() {
    return 'deck opened';
  }

  @Post('create')
  create() {
    return 'deck created';
  }
}

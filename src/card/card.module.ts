import { Module } from '@nestjs/common';
import { CardController } from './card.controller';

@Module({
  controllers: [CardController]
})
export class CardModule {}

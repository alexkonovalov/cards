import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { DeckModule } from './deck/deck.module';

@Module({
  imports: [CardModule, DeckModule],
})
export class AppModule {}

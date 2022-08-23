import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { DeckModule } from './deck/deck.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CardModule, DeckModule, PrismaModule],
})
export class AppModule {}

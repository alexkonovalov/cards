import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { DeckModule } from './deck/deck.module';
import { PrismaModule } from './prisma/prisma.module';
import { CardFactoryService } from './card-factory/card-factory.service';
import { ShuffleService } from './shuffle/shuffle.service';

@Module({
  imports: [CardModule, DeckModule, PrismaModule],
  providers: [CardFactoryService, ShuffleService],
})
export class AppModule {}

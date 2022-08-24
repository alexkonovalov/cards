import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { DeckModule } from './deck/deck.module';
import { PrismaModule } from './prisma/prisma.module';
import { CardFactoryService } from './card-factory/card-factory.service';
import { CardFactoryModule } from './card-factory/card-factory.module';

@Module({
  imports: [CardModule, DeckModule, PrismaModule, CardFactoryModule],
  providers: [CardFactoryService],
})
export class AppModule {}

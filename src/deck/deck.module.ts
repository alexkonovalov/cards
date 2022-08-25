import { Module } from '@nestjs/common';
import { CardModule } from '../card/card.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';

@Module({
  controllers: [DeckController],
  providers: [DeckService],
  imports: [PrismaModule, CardModule],
})
export class DeckModule {}

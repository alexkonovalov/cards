import { Module } from '@nestjs/common';
import { CardFactoryModule } from 'src/card-factory/card-factory.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';

@Module({
  controllers: [DeckController],
  providers: [DeckService],
  imports: [PrismaModule, CardFactoryModule],
})
export class DeckModule {}

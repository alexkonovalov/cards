import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';

@Module({
  controllers: [DeckController],
  providers: [DeckService],
  imports: [PrismaModule],
})
export class DeckModule {}

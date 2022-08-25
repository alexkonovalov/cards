import { Module } from '@nestjs/common';
import { DeckModule } from './deck/deck.module';
import { PrismaModule } from './prisma/prisma.module';
import { CardFactoryService } from './card/card.factory.service';
import { CardModule } from './card/card.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DeckModule,
    CardModule,
  ],
  providers: [CardFactoryService],
})
export class AppModule {}

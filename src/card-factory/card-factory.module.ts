import { Module } from '@nestjs/common';
import { CardFactoryService } from './card-factory.service';

@Module({
  providers: [CardFactoryService],
  exports: [CardFactoryService],
})
export class CardFactoryModule {}

import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { CardDto } from '../card/card.dto';
import { DeckCompleteness } from '../constants';

export class DeckRequestDto {
  @IsBoolean()
  @IsNotEmpty()
  shuffled: boolean;

  @IsString()
  @IsEnum(DeckCompleteness)
  @IsNotEmpty()
  type: DeckCompleteness;
}

export class DrawRequestDto {
  @IsNumber()
  @IsNotEmpty()
  count: number;
}

export class DeckResponseDto {
  shuffled: boolean;
  type: string;
  deckId: string;
  remaining: number;
}

export class DeckFullResponseDto extends DeckResponseDto {
  cards: CardDto[];
}

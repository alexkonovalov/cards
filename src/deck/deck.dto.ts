import { IsNotEmpty, IsBoolean, IsString, IsNumber } from 'class-validator';

export class DeckRequestDto {
  @IsBoolean()
  @IsNotEmpty()
  shuffled: boolean;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class DrawRequestDto {
  @IsNumber()
  @IsNotEmpty()
  count: number;
}

export class CardDto {
  value: string;
  suit: string;
  code: string;
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

import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class DeckRequestDto {
  @IsBoolean()
  @IsNotEmpty()
  shuffled: boolean;

  @IsString()
  @IsNotEmpty()
  type: string;
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

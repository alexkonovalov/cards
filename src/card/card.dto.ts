import { IsNotEmpty, IsString } from 'class-validator';

export class Card {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  suit: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class DeckDto {
  @IsBoolean()
  @IsNotEmpty()
  shuffled: boolean;

  @IsString()
  @IsNotEmpty()
  type: string;
}

import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateMoviesDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  title: string;

  @IsString()
  director: string;

  @IsNumber()
  year: number;
}

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}

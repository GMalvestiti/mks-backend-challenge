import { PartialType } from '@nestjs/swagger';
import { CreateMoviesDto } from './create-movies.dto';

export class UpdateMoviesDto extends PartialType(CreateMoviesDto) {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMoviesDto: CreateMoviesDto) {
    return this.moviesService.create(createMoviesDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMoviesDto: UpdateMoviesDto,
  ) {
    return this.moviesService.update(id, updateMoviesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.remove(id);
  }
}

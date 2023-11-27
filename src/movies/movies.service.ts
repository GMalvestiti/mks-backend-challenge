import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './entities/movies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private moviesRepository: Repository<Movies>,
  ) {}

  async create(createMoviesDto: CreateMoviesDto) {
    try {
      const response = await this.moviesRepository.save(createMoviesDto);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(): Promise<Movies[]> {
    try {
      const movies = await this.moviesRepository.find();
      return movies;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Movies> {
    try {
      const movie = await this.moviesRepository.findOne({ where: { id: id } });

      if (!movie) {
        throw new NotFoundException(`Movie with id: ${id} not found`);
      }

      return movie;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: string, updateMoviesDto: UpdateMoviesDto): Promise<Movies> {
    try {
      const movie = await this.moviesRepository.findOne({ where: { id: id } });

      if (!movie) {
        throw new NotFoundException(`Movie with id: ${id} not found`);
      }

      Object.assign(movie, updateMoviesDto);

      await this.moviesRepository.save(movie);

      return movie;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const movie = await this.moviesRepository.findOne({ where: { id: id } });

      if (!movie) {
        throw new NotFoundException(`Movie with id: ${id} not found`);
      }

      await this.moviesRepository.delete(movie);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUsersDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      createUsersDto.password = await bcrypt.hash(createUsersDto.password, 10);
      const newUser = this.userRepository.create(createUsersDto);
      await this.userRepository.save(newUser);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = newUser;

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

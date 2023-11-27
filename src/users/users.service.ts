import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUsersDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      createUsersDto.password = await bcrypt.hash(createUsersDto.password, 10);
      const newUser = this.usersRepository.create(createUsersDto);
      await this.usersRepository.save(newUser);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...response } = newUser;

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { email: email } });
  }
}

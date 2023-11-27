import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      const passwordMatches = await bcrypt.compare(password, user?.password);
      if (!passwordMatches) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, name: user.name, email: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

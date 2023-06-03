import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne({ login: username });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

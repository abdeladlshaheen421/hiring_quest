import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      client: user.client,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

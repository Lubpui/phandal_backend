import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user =
      (await this.userService.findUserByEmail(email)) ||
      (await this.userService.findUserByUsername(email));

    if (user && (await bcrypt.compare(pass, user.password))) {
      const result = user.toObject();
      return {
        email: result.email,
        username: result.username,
        userId: user._id,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: any) {
    const user = await this.validateUser(data.email, data.password);
    const token = await this.generateToken(user.id);
    return { user, token };
  }

  async register(data: any) {
    const user = await this.userService.createUser(data);

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.userService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }
    delete user.password;
    return user;
  }

  async generateToken(userId: number) {
    return this.jwtService.signAsync(
      { id: userId },
      { expiresIn: '1d', secret: process.env.JWT_SECRET },
    );
  }
}

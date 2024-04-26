import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: any) {
    const user = await this.validateUser(data);
    const token = await this.generateToken(user.id);
    return { user, token };
  }

  async register(data: any) {
    const user = await this.userService.createUser(data);

    return user;
  }

  async me(request: Request) {
    const token = request.headers['authorization'].split(' ')[1];
    const { id } = this.jwtService.decode(token);
    const user = await this.userService.findUserById(id);
    delete user.password;
    return { user };
  }

  async validateUser(data: any) {
    const user = await this.userService.findUserByEmail(data.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.userService.validatePassword(
      data.password,
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

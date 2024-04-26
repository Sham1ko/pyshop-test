import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserUpdateResponseDto } from './dto/user.update.response.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async createUser(data: any) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    delete user.password;

    return user;
  }

  async findUserById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async validatePassword(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async update(id: any, data: any) {
    const { id: _, email: __, ...updateData } = data;
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: updateData,
    });

    return new UserUpdateResponseDto(updatedUser);
  }

  async delete(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}

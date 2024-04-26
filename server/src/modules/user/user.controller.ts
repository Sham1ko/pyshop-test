import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserUpdateResponseDto } from './dto/user.update.response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: any,
    @Body() data: UserUpdateDto,
    @Req() request: any,
  ): Promise<UserUpdateResponseDto> {
    if (request.user.id !== parseInt(id)) {
      throw new UnauthorizedException(
        'You are not authorized to update this user',
      );
    }

    return this.userService.update(parseInt(id), data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: any, @Req() request: any) {
    if (request.user.id !== parseInt(id)) {
      throw new UnauthorizedException(
        'You are not authorized to delete this user',
      );
    }

    return this.userService.delete(parseInt(id));
  }
}

import { Body, Controller, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  async update(@Body() data: any) {
    return this.userService.update(data.id, data);
  }
}

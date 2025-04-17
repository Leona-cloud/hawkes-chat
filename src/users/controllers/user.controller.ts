import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: Partial<User>) {
    return await this.userService.createUser(userData);
  }

  @Get()
  async fetchAllUsers() {
    return await this.userService.findAll();
  }
}

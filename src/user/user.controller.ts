import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }
}

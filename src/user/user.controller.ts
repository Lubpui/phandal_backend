import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpException,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  @Put('/:userId')
  updateUser(@Param('userId') userId: string, @Body() userRequest: UserDto) {
    return this.userService.updateUser(userId, userRequest);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  findAll() {
    return this.userService.findAllUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/:id/upload/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          callback(null, `${req.params.id}-profile.png`);
        },
      }),
    }),
  )
  async uploadImage(
    @Param('id') userId: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) throw new HttpException('Image not found', 404);

    return this.userService.updateUserProfile(userId, image);
  }

  @Post('/:id/upload/base/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          callback(null, `profile.png`);
        },
      }),
    }),
  )
  async uploadBaseImage(@UploadedFile() image: Express.Multer.File) {
    if (!image) throw new HttpException('Image not found', 404);

    return `uploaded ${image.filename} to base image`;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async deleteUserById(@Param('userId') userId: string) {
    return this.userService.deleteUserById(userId);
  }
}

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
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
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
}

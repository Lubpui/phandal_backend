import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import {
  CreateGameListRequest,
  CreateGameRequest,
} from './requests/create-game.request';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  createGame(@Body() createGameListRequest: CreateGameListRequest) {
    return this.gamesService.createGame(createGameListRequest);
  }

  @Get()
  findAllGame() {
    return this.gamesService.findAllGame();
  }

  @Get(':id')
  findGameById(@Param('id') id: string) {
    return this.gamesService.findGameById(id);
  }

  @Patch(':id')
  updateGameById(
    @Param('id') id: string,
    @Body() updateGameRequest: CreateGameRequest,
  ) {
    return this.gamesService.updateGameById(id, updateGameRequest);
  }

  @Delete(':id')
  deleteGameById(@Param('id') id: string) {
    return this.gamesService.deleteGameById(id);
  }
}

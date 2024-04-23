import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('/create/:id')
  createById(
    @Param('id') id: string,
    @Body() createHistoryDto: CreateHistoryDto,
  ) {
    return this.historyService.createHistory(id, createHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Param('id') id: string) {
    return this.historyService.findHistoryById(id);
  }
}

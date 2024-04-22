import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('/create')
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.createHistory(createHistoryDto);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.historyService.findHistoryById(id);
  }
}

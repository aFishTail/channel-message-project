import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {
  QueryMessageListInputDto,
  QueryMessageListOutDto,
} from './dto/query-message.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/base.dto';

@ApiTags('message')
@Controller('message')
@UseInterceptors(CacheInterceptor)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({
    summary: 'create message in a channel',
  })
  @ApiResponse({
    status: 201,
    description: 'create message success',
    type: ResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @ApiOperation({
    summary: 'query message list in a channel and order by descending',
  })
  @ApiResponse({
    status: 201,
    description: 'Return message list',
    type: QueryMessageListOutDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':channel')
  findAll(
    @Query() query: QueryMessageListInputDto,
    @Param('channel', ParseIntPipe) channel: number,
  ) {
    return this.messageService.findAll(query, channel);
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/base.dto';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { QueryChannelListOutDto } from './dto/query-channel.dto';

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiOperation({
    summary: 'create a channel',
  })
  @ApiResponse({
    status: 201,
    description: 'create a channel success',
    type: ResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    await this.channelService.create(createChannelDto);
    return;
  }

  @ApiOperation({ summary: 'list all channel' })
  @ApiResponse({
    status: 201,
    description: 'return channel list',
    type: QueryChannelListOutDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get()
  async findAll() {
    return await this.channelService.findAll();
  }
}

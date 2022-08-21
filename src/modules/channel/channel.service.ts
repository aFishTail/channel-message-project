import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelEntity } from './entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
  ) {}
  async create(createChannelDto: CreateChannelDto) {
    const { name } = createChannelDto;
    const channel = await this.channelRepository.findOneBy({ name });
    if (channel) {
      throw new HttpException(
        'channel name is existed',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newChannel = await this.channelRepository.create({
      name: name,
    });
    await this.channelRepository.save(newChannel);
    return;
  }

  async findAll() {
    return await this.channelRepository.find();
  }
}

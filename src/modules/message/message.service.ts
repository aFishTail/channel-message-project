import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelEntity } from '../channel/entities/channel.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { QueryMessageListInputDto } from './dto/query-message.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const { title, content, channel } = createMessageDto;

    const channelRow = await this.channelRepository.findOneBy({
      id: channel,
    });
    if (!channelRow) {
      throw new HttpException('unexisted channel!', HttpStatus.BAD_REQUEST);
    }
    const message = await this.messageRepository.create({
      title,
      content,
      channel,
    });
    await this.messageRepository.save(message);
    return;
  }

  async findAll(query: QueryMessageListInputDto, channel) {
    const { pageNum, pageSize, title } = query;
    const qb = this.messageRepository
      .createQueryBuilder('message')
      .where('message.channel = :channel', { channel });

    if (title) {
      qb.where('message.title = :title', { title });
    }

    qb.take(pageSize)
      .skip((pageNum - 1) * pageSize)
      .orderBy('createdAt', 'DESC');
    const [records, total] = await qb.getManyAndCount();

    return {
      records,
      total,
    };
  }
}

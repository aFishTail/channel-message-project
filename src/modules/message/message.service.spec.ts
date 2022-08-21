import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelEntity } from '../channel/entities/channel.entity';
import { MessageEntity } from './entities/message.entity';
import { MessageService } from './message.service';

const messageArray = [
  {
    title: 'message #1',
    content: 'content #1',
    channel: 1,
    createdAt: '2022-08-19: 12:00:00',
  },
  {
    title: 'message #2',
    content: 'content #2',
    channel: 1,
    createdAt: '2022-08-19: 12:00:01',
  },
  {
    title: 'message #3',
    content: 'content #23',
    channel: 2,
    createdAt: '2022-08-19: 12:00:02',
  },
];

const oneMessage = {
  title: 'message #4',
  content: 'content #4',
  channel: 1,
};

const channelArray = [
  {
    id: 1,
    name: 'channel #1',
  },
  {
    id: 2,
    name: 'channel #2',
  },
];

describe('MessageService', () => {
  let service: MessageService;
  let repository: Repository<MessageEntity>;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(MessageEntity),
          useValue: {
            create: jest.fn().mockImplementation((message) => {
              return Promise.resolve(message);
            }),
            save: jest.fn().mockImplementation((message) => {
              return Promise.resolve(message);
            }),
          },
        },
        {
          provide: getRepositoryToken(ChannelEntity),
          useValue: {
            findOneBy: jest.fn().mockImplementation(({ id }) => {
              return Promise.resolve(channelArray.find((e) => e.id === id));
            }),
          },
        },
      ],
    }).compile();
    service = module.get<MessageService>(MessageService);
    repository = module.get<Repository<MessageEntity>>(
      getRepositoryToken(MessageEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully create a message', async () => {
      const spySave = jest.spyOn(repository, 'save');
      const oneMessage = {
        title: 'message #4',
        content: 'content #4',
        channel: 1,
      };
      const result = await service.create(oneMessage);
      expect(result).toBeUndefined();
      expect(spySave).toBeCalledWith(oneMessage);
    });
  });
  describe('create()', () => {
    it('can not create message with a unexisted channel', async () => {
      const oneMessage = {
        title: 'message #4',
        content: 'content #4',
        channel: 3,
      };
      try {
        await service.create(oneMessage);
      } catch (error) {
        expect(error).toEqual(
          new HttpException('unexisted channel!', HttpStatus.BAD_REQUEST),
        );
      }
    });
  });

  //TODO: how to mock chain call?
  // describe('findAll()', () => {
  //   it('should list all message in a channel', async () => {
  //     const result = await service.findAll(
  //       {
  //         pageNum: 1,
  //         pageSize: 12,
  //       },
  //       1,
  //     );
  //     const sqSpy = jest.spyOn(repository, 'createQueryBuilder');
  //     expect(sqSpy).toBeCalledWith('message');
  //     console.log('sqSpy', sqSpy);
  //   });
  // });
});

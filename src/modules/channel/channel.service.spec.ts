import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelService } from './channel.service';
import { ChannelEntity } from './entities/channel.entity';

const channelArray = [
  {
    name: 'channel #1',
  },
  {
    name: 'channel #2',
  },
];

describe('ChannelService', () => {
  let service: ChannelService;
  let repository: Repository<ChannelEntity>;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        ChannelService,
        {
          provide: getRepositoryToken(ChannelEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(channelArray),
            findOneBy: jest.fn().mockImplementation(({ name }) => {
              return Promise.resolve(channelArray.find((e) => e.name === name));
            }),
            create: jest.fn().mockImplementation((channel) => {
              return Promise.resolve(channel);
            }),
            save: jest.fn().mockImplementation((channel) => {
              return Promise.resolve(channel);
            }),
          },
        },
      ],
    }).compile();
    service = module.get<ChannelService>(ChannelService);
    repository = module.get<Repository<ChannelEntity>>(
      getRepositoryToken(ChannelEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', async () => {
      const spySave = jest.spyOn(repository, 'save');
      const result = await service.create({
        name: 'channel #3',
      });
      expect(result).toBeUndefined();
      expect(spySave).toBeCalledWith({
        name: 'channel #3',
      });
    });
  });

  describe('create()', () => {
    it('can not create channel with repeated name', async () => {
      try {
        await service.create({
          name: 'channel #1',
        });
      } catch (error) {
        expect(error).toEqual(
          new HttpException('channel name is existed', HttpStatus.BAD_REQUEST),
        );
      }
    });
  });

  describe('find()', () => {
    it('should list all channels', async () => {
      const result = await service.findAll();
      expect(result).toEqual(channelArray);
    });
  });
});

import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/base.dto';
import { ChannelEntity } from '../entities/channel.entity';

export class QueryChannelListOutDto extends ResponseDto {
  @ApiProperty({ type: ChannelEntity, isArray: true })
  data: unknown;
}

import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { QueryPagerInputDto, ResponseDto } from 'src/common/base.dto';
import { MessageEntity } from '../entities/message.entity';

export class QueryMessageInputDto {
  @ApiProperty({ example: 'message title', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;
}

export class QueryMessageListInputDto extends IntersectionType(
  QueryPagerInputDto,
  QueryMessageInputDto,
) {}

export class QueryMessageListOutDto extends ResponseDto {
  @ApiProperty({ type: MessageEntity, isArray: true })
  data: unknown;
}

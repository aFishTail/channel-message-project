import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({ example: 'channel name 1' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}

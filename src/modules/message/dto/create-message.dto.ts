import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'message title' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @ApiProperty({ example: 'message content' })
  @IsString()
  @MaxLength(240)
  content?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  channel: number;
}

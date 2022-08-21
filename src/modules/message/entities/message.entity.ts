import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('message')
export class MessageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ comment: '消息标题' })
  title: string;

  @ApiProperty()
  @Column({ comment: '消息内容' })
  content: string;

  @ApiProperty()
  @Column({ comment: '处于哪个channel下' })
  channel: number;

  @ApiProperty()
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'cretaedAt',
  })
  createdAt: Date;
}

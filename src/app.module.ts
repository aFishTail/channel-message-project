import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { ChannelModule } from './modules/channel/channel.module';
import { ChannelEntity } from './modules/channel/entities/channel.entity';
import { MessageEntity } from './modules/message/entities/message.entity';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('mysql.host'),
        port: configService.get<number>('mysql.port'),
        username: configService.get<string>('mysql.username'),
        password: configService.get<string>('mysql.password'),
        database: configService.get<string>('mysql.database'),
        entities: [ChannelEntity, MessageEntity],
        charset: 'utf8mb4',
        timezone: '+08:00',
        synchronize: false,
        migrationsTableName: 'custom_migration_table',
        migrations: ['migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
      }),
    }),
    CacheModule.register({ isGlobal: true }),
    ChannelModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

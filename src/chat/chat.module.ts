import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forFeature([])],
  providers: [ChatGateway],
})
export class ChatModule {}

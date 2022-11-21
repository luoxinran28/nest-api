import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([])],
  providers: [ChatGateway],
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blog.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { StationsModule } from './stations/stations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BlogsModule,
    ChatModule,
    StationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BlogService } from './service/blog.service';
import { BlogController } from './controller/blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './model/blog.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity]), AuthModule],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}

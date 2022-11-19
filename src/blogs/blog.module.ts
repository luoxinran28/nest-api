import { Module } from '@nestjs/common';
import { BlogService } from './service/blogs.service';
import { BlogController } from './controller/blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './model/blog.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity]), AuthModule, UsersModule],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogsModule {}

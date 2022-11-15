import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map, Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Blog } from '../model/blog.interface';
import { BlogService } from '../service/blog.service';

@ApiTags('blogs')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  create(@Body() blog: Blog): Observable<Blog | any> {
    return this.blogService.create(blog).pipe(
      map((blog: Blog) => blog),
      catchError((err) => of({ error: err.message }))
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Blog> {
    return this.blogService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: number, @Body() blog: Blog): Observable<Blog> {
    return this.blogService.updateOne(Number(id), blog);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.blogService.deleteOne(id);
  }
}

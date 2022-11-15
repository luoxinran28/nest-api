import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map, Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { User } from 'src/user/models/user.interface';
import { Blog } from '../model/blog.interface';
import { BlogService } from '../service/blog.service';

export const BLOG_ENTRIES_URL = '/api/blogs';

@ApiTags('blogs')
@Controller('api/blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  create(@Body() user: User, @Body() blog: Blog): Observable<Blog | any> {
    return this.blogService.create(user, blog).pipe(
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

  @Get('')
  index(@Query('page') page = 1, @Query('limit') limit = 10) {
    limit = limit > 100 ? 100 : limit;

    const paginationOptions = {
      limit: +limit,
      page: +page,
      route: BLOG_ENTRIES_URL,
    };

    return this.blogService.paginate(paginationOptions);
  }

  @Get('user/:user')
  indexByUser(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Param('user') userId: string
  ) {
    limit = limit > 100 ? 100 : limit;

    const paginationOptions = {
      limit: +limit,
      page: +page,
      route: BLOG_ENTRIES_URL + '/user/' + userId,
    };

    return this.blogService.paginateByUserId(paginationOptions, userId);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map, Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { User } from 'src/users/models/user.interface';
import { Blog } from '../model/blog.interface';
import { BlogService } from '../service/blog.service';

export const BLOG_ENTRIES_URL = '/v1/blogs';

@ApiTags('blogs')
@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() blog: Blog): Observable<Blog | any> {
    const { user } = req;
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

  @Get('user/:userId')
  indexByUser(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Param('userId') userId: string
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

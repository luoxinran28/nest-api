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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { catchError, map, Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Blog } from '../model/blog.interface';
import { BlogService } from '../service/blogs.service';
import path = require('path');
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UserIsAuthorGuard } from '../guard/user-is-author';

export const BLOG_ENTRIES_URL = '/v1/blogs';

export const storage = {
  storage: diskStorage({
    destination: './uploads/blog-images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Put(':id')
  updateOne(@Param('id') id: number, @Body() blog: Blog): Observable<Blog> {
    return this.blogService.updateOne(Number(id), blog);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Req() req): Observable<any> {
    return of(file);
  }

  @Get('profile-image/:imagename')
  findImage(@Param('imagename') imagename, @Res() res): Observable<any> {
    return of(
      res.sendFile(
        join(process.cwd(), 'uploads/blog-entry-images/' + imagename)
      )
    );
  }
}

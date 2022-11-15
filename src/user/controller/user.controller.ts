import { Pagination } from 'nestjs-typeorm-paginate';
import { catchError, map, Observable, of } from 'rxjs';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserService } from 'src/user/service/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
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
import { User } from '../models/user.interface';
import path = require('path');
import { join } from 'path';
import { MyselfGuard } from 'src/auth/guards/myself.guard';
import { ApiTags } from '@nestjs/swagger';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User | any> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message }))
    );
  }

  @Post('login')
  login(@Body() user: User): Observable<any> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      })
    );
  }

  @Get(':id')
  findOne(@Param('id') id): Observable<User> {
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<User> {
    return this.userService.deleteOne(+id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, MyselfGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<User> {
    return this.userService.updateOne(+id, user);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  updateRoleOfUser(
    @Param('id') id: string,
    @Body() user: User
  ): Observable<User> {
    return this.userService.updateRoleOfUser(+id, user);
  }

  @Get()
  index(
    @Query('page') page = 1,
    @Query('limit') limit = 2,
    @Query('username') username: string
  ): Observable<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;

    const paginationOptions = {
      page: +page,
      limit: +limit,
      route: '/api/users',
    };

    if (!username) {
      return this.userService.paginate(paginationOptions);
    } else {
      return this.userService.paginateFilterByUsername(
        paginationOptions,
        username
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Req() req): Observable<any> {
    const { user } = req.user;
    console.log(user);
    return this.userService
      .updateOne(user.id, { profileImage: file.filename, ...user })
      .pipe(map((user: User) => ({ profileImage: user.profileImage })));
  }

  @Get('profile-image/:imagename')
  findProfileImage(
    @Param('imagename') imagename: string,
    @Res() res
  ): Observable<any> {
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename))
    );
  }
}

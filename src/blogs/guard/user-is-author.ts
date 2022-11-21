import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { User } from 'src/user/model/user.interface';
import { UserService } from 'src/user/service/user-service/user.service';
import { Blog } from '../model/blog.interface';
import { BlogService } from '../service/blogs.service';

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private blogService: BlogService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const blogId = +params.id;
    const user: User = request.user;

    // const foundUser: User = await this.userService.getOne(user.id);
    // const foundBlog: User = await this.blogService.getOne(blogId);
    // return foundUser.id === user.id;
    return true;

    // return this.userService.getOne(user.id).pipe(
    //   switchMap((user: User) =>
    //     this.blogService.findOne(blogId).pipe(
    //       map((blog: Blog) => {
    //         return user && user.id === blog.author.id;
    //       })
    //     )
    //   )
    // );
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { User } from 'src/users/models/user.interface';
import { UserService } from 'src/users/service/users.service';
import { Blog } from '../model/blog.interface';
import { BlogService } from '../service/blogs.service';

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private blogService: BlogService
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const blogId = +params.id;
    const user: User = request.user;

    return this.userService.findOne(user.id).pipe(
      switchMap((user: User) =>
        this.blogService.findOne(blogId).pipe(
          map((blog: Blog) => {
            return user && user.id === blog.author.id;
          })
        )
      )
    );
  }
}

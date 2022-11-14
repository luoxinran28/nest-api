import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class MyselfGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const user: User = request.user;

    return this.userService.findOne(user.id).pipe(
      map((user: User) => {
        return user && user.id === Number(params.id);
      })
    );
  }
}

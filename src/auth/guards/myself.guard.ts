import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/user/model/user.interface';
import { UserService } from 'src/user/service/user-service/user.service';
// import { User } from 'src/user/models/user.interface';
// import { UserService } from 'src/user/service/users.service';

@Injectable()
export class MyselfGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const user: User = request.user;

    const foundUser: User = await this.userService.getOne(user.id);
    return foundUser.id === user.id;
    // return this.userService.findOne(user.id).pipe(
    //   map((user: User) => {
    //     return user && user.id === Number(params.id);
    //   })
    // );
  }
}

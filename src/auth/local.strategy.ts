import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // validate(username: string, password: string): Observable<any> {
  //   // const user = this.authService.validateUser(username, password);
  //   // if (!user) {
  //   //   throw new UnauthorizedException();
  //   // }
  //   // return user;
  //   // return this.authService.comparePasswords(password);
  // }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  // validateUser(username: string, pw: string): Observable<any> {
  //   const user = this.userService.findOneByUsername(username);
  //   if (user && user.password === pw) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  generateJWT(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePasswords(
    newPassword: string,
    passwordHash: string
  ): Observable<boolean> {
    return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

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

  comparePasswords(newPassword: string, passwordHash: string): Observable<any> {
    return from<any | boolean>(bcrypt.compare(newPassword, passwordHash));
  }
}

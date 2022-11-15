import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { User } from 'src/user/models/user.interface';
import { Repository } from 'typeorm';
import { BlogEntity } from '../model/blog.entity';
import { Blog } from '../model/blog.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const slugify = require('slugify');

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    private authService: AuthService
  ) {}

  generateSlug(title: string): Observable<string> {
    return of(slugify(title));
  }

  create(user: User, blog: Blog): Observable<Blog> {
    blog.author = user;
    return this.generateSlug(blog.title).pipe(
      switchMap((slug: string) => {
        blog.slug = slug;
        return from(this.blogRepository.save(blog));
      })
    );

    // return from(this.blogRepository.save(blog)).pipe(
    //   map((blog: Blog) => {
    //     return blog;
    //   }),
    //   catchError((err) => throwError(() => err))
    // );
  }

  findOne(id: number): Observable<Blog> {
    return from(
      this.blogRepository.findOne({ where: { id }, relations: ['author'] })
    ).pipe(
      map((blog: Blog) => {
        return blog;
      })
    );
  }

  updateOne(id: number, blogEntry: Blog): Observable<Blog> {
    return from(this.blogRepository.update(id, blogEntry)).pipe(
      switchMap(() => this.findOne(id))
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.blogRepository.delete(id));
  }
}

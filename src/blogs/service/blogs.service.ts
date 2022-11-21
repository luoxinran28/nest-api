import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { User } from 'src/user/model/user.interface';
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

  paginate(options: IPaginationOptions): Observable<Pagination<Blog>> {
    return from(
      paginate<Blog>(this.blogRepository, options, {
        relations: ['author'],
      })
    ).pipe(map((blogEntries: Pagination<Blog>) => blogEntries));
  }

  paginateByUserId(
    options: IPaginationOptions,
    userId: string
  ): Observable<Pagination<Blog>> {
    return from(
      paginate<Blog>(this.blogRepository, options, {
        relations: ['author'],
        where: [{ author: { id: +userId } }],
      })
    ).pipe(map((blogEntries: Pagination<Blog>) => blogEntries));
  }
}

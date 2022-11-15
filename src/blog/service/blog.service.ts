import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { Repository } from 'typeorm';
import { BlogEntity } from '../model/blog.entity';
import { Blog } from '../model/blog.interface';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    private authService: AuthService
  ) {}

  create(blog: Blog): Observable<Blog> {
    return from(this.blogRepository.save(blog)).pipe(
      map((blog: Blog) => {
        return blog;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  findOne(id: number): Observable<Blog> {
    return from(this.blogRepository.findOne({ where: { id } })).pipe(
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

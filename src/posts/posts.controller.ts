import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('cats')
export class PostsController {
  @Get()
  @ApiOperation({ summary: '显示博客列表' })
  index() {
    return [{ id: 1 }, { id: 1 }, { id: 1 }];
  }
  @Get(':id')
  detail() {
    return [
      {
        id: 1,
        title: 'aaaaa',
      },
      {
        id: 2,
        title: 'bbbbbb',
      },
      {
        id: 3,
        title: 'ccccccc',
      },
    ];
  }
  @Post()
  create() {
    return {
      success: true,
    };
  }
}

import { Controller, Get, Post } from '@nestjs/common';

@Controller('posts')
@ApiUseTags('posts')
export class PostsController {
  @Get()
  index() {
    return [
      { id: 1 },
      { id: 1 },
      { id: 1 },
    ];
  }
  @Get(":id")
  detail() {
    return [
      { 
        id: 1,
        title: "aaaaa"
      },
      { 
        id: 2,
        title: "bbbbbb"
      },
      { 
        id: 3,
        title: "ccccccc"
      },
    ];
  }
  @Post()
  create() {
    return {
      success: true
    };
  }

}
function ApiUseTags(arg0: string) {
  throw new Error('Function not implemented.');
}


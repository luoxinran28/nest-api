import { Role } from 'src/auth/enums/role.enum';
import { Blog } from 'src/blog/model/blog.interface';

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role: Role;
  profileImage: string;
  blogs: Blog[];
}

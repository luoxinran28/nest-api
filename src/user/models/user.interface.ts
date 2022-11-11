import { Role } from 'src/auth/enums/role.enum';

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role: Role;
}

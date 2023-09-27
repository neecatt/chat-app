import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

interface IUser extends User {
  id: number;
  username: string;
  createdAt: Date;
}

export class UserResponseDto implements IUser {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Exclude()
  createdAt: Date;
}

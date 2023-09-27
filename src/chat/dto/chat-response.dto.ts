import { Chat } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

interface IChat extends Chat {
  id: number;
  name: string;
  createdAt: Date;
}

export class ChatResponseDto implements IChat {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Exclude()
  createdAt: Date;
}

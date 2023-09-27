import { IsNumberString } from 'class-validator';

export class FindChatsForUserDto {
  @IsNumberString()
  user: string;
}

import { IsNumberString } from 'class-validator';

export class FindMessageDto {
  @IsNumberString()
  chat: string;
}

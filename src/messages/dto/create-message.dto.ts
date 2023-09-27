import { IsNumberString, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumberString()
  chat: string;

  @IsNumberString()
  author: string;

  @IsString()
  text: string;
}

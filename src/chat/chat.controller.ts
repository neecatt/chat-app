import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ChatResponseDto } from './dto/chat-response.dto';
import { FindChatsForUserDto } from './dto/find-chats-user.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('add')
  @Serialize(ChatResponseDto)
  async create(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.create(createChatDto);
  }

  @Post('get')
  async findChatsForUser(@Body() findChatsForUserDto: FindChatsForUserDto) {
    return await this.chatService.findChatsForUser(findChatsForUserDto);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.findOneById(id);
  }
}

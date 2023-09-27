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

@Controller('chat')
@Serialize(ChatResponseDto)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('add')
  async create(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.create(createChatDto);
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

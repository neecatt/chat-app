import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FindMessageDto } from './dto/find-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    const { text, author, chat } = createMessageDto;
    const userId = Number(author);
    const chatId = Number(chat);
    try {
      return await this.prisma.message.create({
        data: {
          text,
          userId,
          chatId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(
          'Provided userId or chatId is not valid.',
        );
      }
      throw error;
    }
  }

  async findMessageInChat(findMessageDto: FindMessageDto) {
    const { chat } = findMessageDto;
    const chatId = Number(chat);

    try {
      const messages = await this.prisma.message.findMany({
        where: {
          chatId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!messages.length) {
        throw new NotFoundException(
          `No messages have been found in chat has ${chatId} id`,
        );
      }
      return messages;
    } catch (error) {
      throw error;
    }
  }
}

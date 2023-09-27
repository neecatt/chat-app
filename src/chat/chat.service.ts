import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createChatDto: CreateChatDto) {
    const { name, users } = createChatDto;
    try {
      const chat = await this.prisma.chat.findUnique({
        where: {
          name,
        },
      });

      if (chat) {
        throw new ConflictException(
          `The chat with name ${name} already exists.`,
        );
      }
      const usersArray = users.map((username) => {
        return { username };
      });
      const newChat = await this.prisma.chat.create({
        data: {
          name,
          users: {
            connect: [...usersArray],
          },
        },
      });
      return newChat;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Entered users are not valid.');
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const chats = await this.prisma.chat.findMany({});
      if (!chats.length) {
        throw new NotFoundException('No chats found');
      }
      return chats;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number) {
    try {
      const chat = await this.prisma.chat.findUnique({
        where: {
          id,
        },
      });
      if (!chat) {
        throw new NotFoundException(`Chat with id ${id} not found`);
      }
      return chat;
    } catch (error) {
      throw error;
    }
  }
}

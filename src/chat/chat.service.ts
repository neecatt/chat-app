import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FindChatsForUserDto } from './dto/find-chats-user.dto';
import { Chat } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Function to create a new chat
   * @param {CreateChatDto} createChatDto - The createChatDto object
   * @returns {Promise<Chat>} - The newly created chat
   * @throws {ConflictException} - If the chat already exists
   * @throws {BadRequestException} - If the users are not valid
   * @throws {Error} - If any other error occurs
   */
  async create(createChatDto: CreateChatDto): Promise<Chat> {
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
      const usersArray = users.map((userId) => {
        return { id: Number(userId) };
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

  /**
   * Function to find all chats
   * @returns {Promise<Chat[]>} - The array of chats
   * @throws {NotFoundException} - If no chats are found
   * @throws {Error} - If any other error occurs
   */
  async findAll(): Promise<Chat[]> {
    try {
      const chats = await this.prisma.chat.findMany();
      if (!chats.length) {
        throw new NotFoundException('No chats found');
      }
      return chats;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to find a chat by id
   * @param {number} id - The id of the chat
   * @returns {Promise<Chat>} - The chat
   * @throws {NotFoundException} - If no chat is found
   * @throws {Error} - If any other error occurs
   */
  async findOneById(id: number): Promise<Chat> {
    try {
      const chat = await this.prisma.chat.findUnique({
        where: {
          id,
        },
      });
      if (!chat) {
        throw new NotFoundException(`The Chat with id ${id} not found`);
      }
      return chat;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to find a chat by userId
   * @param {findChatsForUserDto} findChatsForUserDto - The findChatsForUserDto object
   * @returns {Promise<Chat[]>} - Returns an array of chats which the user with given id is a part of and sorted by latest message in the chat
   * @throws {NotFoundException} - If no chat is found
   * @throws {Error} - If any other error occurs
   */
  async findChatsForUser(
    findChatsForUserDto: FindChatsForUserDto,
  ): Promise<Chat[]> {
    const { user } = findChatsForUserDto;
    const userId = Number(user);

    try {
      const chats = await this.prisma.$queryRaw<Chat[]>`
        SELECT c.*
        FROM chats c
        INNER JOIN _ChatToUser cu ON c.id = cu.A
        INNER JOIN (
        SELECT chatId, MAX(created_at) AS latest_message
        FROM messages
        GROUP BY chatId
        ) AS latest_messages ON c.id = latest_messages.chatId
        WHERE cu.B = ${userId}
        ORDER BY latest_messages.latest_message DESC;
      `;

      if (!chats.length) {
        throw new NotFoundException(
          `No chats found for user with id ${userId}`,
        );
      }
      return chats;
    } catch (error) {
      throw error;
    }
  }
}

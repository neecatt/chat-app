import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from './types';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const { username } = createUserDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (user) {
        throw new ConflictException(
          `The user with username ${username} already exist.`,
        );
      }
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({});
      if (!users.length) {
        throw new NotFoundException('There are no users');
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new NotFoundException(`The user with id ${id} not found.`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

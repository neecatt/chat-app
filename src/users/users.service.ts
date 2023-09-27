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

  /**
   * Function to create a new user
   * @param createUserDto - The createUserDto object
   * @returns {Promise<UserResponse>} - The newly created user
   * @throws {ConflictException} - If the user already exists
   * @throws {Error} - If any other error occurs
   */
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

  /**
   * Function to find all users
   * @returns {Promise<UserResponse[]>} - The users
   * @throws {NotFoundException} - If no users are found
   * @throws {Error} - If any other error occurs
   */
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

  /**
   * Function to find a user by id
   * @param {number} id - The user id
   * @returns {Promise<UserResponse>} - The user
   * @throws {NotFoundException} - If the user is not found
   * @throws {Error} - If any other error occurs
   */
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

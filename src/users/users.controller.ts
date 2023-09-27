import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
@Serialize(UserResponseDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneById(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ResponseUtil } from '../common/utils/response.util';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return ResponseUtil.success(
      'User created successfully',
      user,
      HttpStatus.CREATED,
    );
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return ResponseUtil.success(
      'Users fetched successfully',
      users,
      HttpStatus.OK,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return ResponseUtil.success(
      'User fetched successfully',
      user,
      HttpStatus.OK,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, dto);
    return ResponseUtil.success(
      'User updated successfully',
      user,
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return ResponseUtil.success(
      'User deleted successfully',
      null,
      HttpStatus.OK,
    );
  }
}

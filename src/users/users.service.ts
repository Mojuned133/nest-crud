import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = new this.userModel(dto);
    return user.save();
  }

  async findAll() {
    return this.userModel.find().lean().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const updated = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean()
      .exec();

    if (!updated) {
      throw new NotFoundException('User not found');
    }

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
    return true;
  }
}

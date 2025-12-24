import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    index: true,
    trim: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true, index: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongoConfig = (): MongooseModuleOptions => ({
  uri: process.env.MONGO_URI || 'mongodb://mongo:27017/nest_crud',
  autoIndex: true,
});

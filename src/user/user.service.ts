import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { createUserDto } from 'src/user/User.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
      ){}
      async getAllUsers(): Promise <User[]> {
        return this.userModel.find().exec()
      }

      async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec()
      }

      async createUser(createUserDto:createUserDto): Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
        const updatedUserData = {
            ...createUserDto, 
            password: hashedPassword,
          };

        const newUser =  new this.userModel(updatedUserData)
        return newUser.save()
      }

}

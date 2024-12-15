import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { loginDto, createUserDto } from '../user/User.dto';
import { JwtService as JwtStrategy } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly userService: UserService,
        private readonly JwtStrategy: JwtStrategy,
      ){}


      async registerUser(createUserDto: createUserDto): Promise<{ user: User; accessToken: string }> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const existingUser = await this.userService.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new Error('User already exists');
          }
        
        const newUser = await this.userService.createUser({
            ...createUserDto,
            password: hashedPassword,
        })

        const payload = { email: newUser.email, sub: newUser._id };
        const accessToken = this.JwtStrategy.sign(payload);
        return { user: newUser, accessToken }

    }
        


      async loginUser(LoginDto: loginDto): Promise<{accessToken: string}> {
        const existingUser = await this.userService.findByEmail(LoginDto.email)
        if (!existingUser) {
            throw new Error('User is not found')
        }

        const isPasswordValid = await bcrypt.compare(LoginDto.password, existingUser.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
          }

        const payload = { email: existingUser.email, sub: existingUser._id };
        const accessToken = this.JwtStrategy.sign(payload);

    return { accessToken };

      }
}

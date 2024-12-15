import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { UserService } from 'src/user/user.service';
import { loginDto, createUserDto } from '../user/User.dto';
import { JwtService as JwtStrategy } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private readonly userService;
    private readonly JwtStrategy;
    constructor(userModel: Model<UserDocument>, userService: UserService, JwtStrategy: JwtStrategy);
    registerUser(createUserDto: createUserDto): Promise<{
        user: User;
        accessToken: string;
    }>;
    loginUser(LoginDto: loginDto): Promise<{
        accessToken: string;
    }>;
}

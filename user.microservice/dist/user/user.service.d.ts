import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { createUserDto } from './User.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getAllUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<UserDocument | null>;
    createUser(createUserDto: createUserDto): Promise<UserDocument>;
    updateUser(userId: string, updateData: Partial<User>): Promise<User>;
}

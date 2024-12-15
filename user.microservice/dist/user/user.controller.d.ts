import { UserService } from './user.service';
import { User } from './user.schema';
import { createUserDto } from './User.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    createUser(createUserDto: createUserDto): Promise<import("./user.schema").UserDocument>;
    updateUser(req: any, updateData: {
        name?: string;
        email?: string;
    }): Promise<User>;
}

import { AuthService } from './auth.service';
import { User } from '../user/user.schema';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    registerUser(createUserDto: any): Promise<{
        user: User;
        accessToken: string;
    }>;
    loginUser(loginDto: any): Promise<{
        accessToken: string;
    }>;
}

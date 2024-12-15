import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.schema'
import { loginDto, createUserDto } from '../user/User.dto';

@Controller('authentication')
export class AuthController {
    constructor (private readonly AuthService: AuthService) {}

    @Post('/register')
    async registerUser(@Body() createUserDto): Promise<{ user: User; accessToken: string }> {
        return this.AuthService.registerUser(createUserDto)
    };

    @Post('/login')
    async loginUser(@Body()loginDto): Promise <{accessToken: string}> {
        return this.AuthService.loginUser(loginDto)
    }
}

import { Body, Controller, Get, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema'
import { createUserDto } from 'src/user/User.dto';

@Controller('users')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get()
    async getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Post() 
    async createUser(@Body()createUserDto: createUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Patch()

}

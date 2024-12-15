import { Body, Controller, Get, Patch, Post, UseGuards, Request, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema'
import { createUserDto } from './User.dto';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';


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

@UseGuards(JwtAuthGuard) 
  @Patch('update')
  async updateUser(
    @Request() req, 
    @Body() updateData: { name?: string; email?: string }, 
  ) {
    const userId = req.user.userId; 
    return this.userService.updateUser(userId, updateData);
  }
}


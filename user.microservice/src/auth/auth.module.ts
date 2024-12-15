import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema'
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
    JwtModule.register({
      secret: 'MHu2Mt',
      signOptions: { expiresIn: '3h' }
    })
    
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy
  ]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { jwtSignature } from './constants';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secretOrPrivateKey: jwtSignature,
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}

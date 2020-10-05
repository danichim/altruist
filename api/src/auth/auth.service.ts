import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { LoginUserDTO } from './auth.dto';
import { UserRepository } from '../user/user.repository';
import * as crypto from "crypto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  private async validate(user_data: LoginUserDTO): Promise<User> {
    return await this.userRepository.findByEmail(user_data.email);
  }

  public async login(user: LoginUserDTO): Promise<any | { status: number }> {
    const userData = await this.userRepository.findByEmail(user.email);
    if (!userData) {
      return false;
    }

    console.log(userData);

    const password = await crypto.createHmac('sha256', user.password).digest('hex');

    if (password !== userData.password) {
      throw new UnauthorizedException('User or password incorrect.');
    }

    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };

    const access_token = this.jwtService.sign(payload);

    userData.latitude = user.latitude;
    userData.longitude = user.longitude;
    await this.userRepository.save(userData);

    return {
      ...payload,
      access_token: access_token,
    };
  }

  public async register(@Body() user: any): Promise<any> {
    return this.userService.create(user);
  }

  public async update(@Body() user: any): Promise<any> {
    return this.userService.update(user);
  }
}

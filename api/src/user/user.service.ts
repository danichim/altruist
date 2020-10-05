import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { validate } from 'class-validator';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(userDTO: User): Promise<any> {
    const user = new User();
    user.name = userDTO.name;
    user.surname = userDTO.surname;
    user.latitude = userDTO.latitude;
    user.longitude = userDTO.longitude;
    user.phone = userDTO.phone;
    user.action_perimeter = userDTO.action_perimeter || 5;
    user.email = userDTO.email;
    user.available = userDTO.available || false;
    user.password = userDTO.password;

    const errors = await validate(user);
    if (errors.length > 0) {
      return errors;
    }

    return await this.userRepository.save(user);
  }

  async update(userDTO: any): Promise<any> {
    const user = await this.userRepository.findOne(userDTO.id);

    user.name = userDTO.name || user.name;
    user.surname = userDTO.name || user.surname;
    user.latitude = parseFloat(userDTO.latitude || user.latitude);
    user.longitude = parseFloat(userDTO.longitude || user.longitude);
    user.phone = userDTO.phone || user.phone ;
    user.action_perimeter = userDTO.action_perimeter || user.action_perimeter;
    user.email = userDTO.email || user.email;
    user.available = userDTO.available || user.available || false;
    user.password = userDTO.password || user.password;

    const errors = await validate(user);
    if (errors.length > 0) {
      return errors;
    }

    return await this.userRepository.save(user);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}

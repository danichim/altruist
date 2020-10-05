import {
  IsEmail,
  IsNotEmpty, IsNumber,
  IsString, Validate,
} from 'class-validator';
import { UserExistValidator } from '../user/user.validator';


export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @Validate(UserExistValidator)
  @IsEmail({}, { message: 'Incorect E-mail' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from './user.entity';
import { ValidationArguments } from 'class-validator/validation/ValidationArguments';

// Check if user with email exist and return error
@ValidatorConstraint()
export class UserUniqueValidator implements ValidatorConstraintInterface {
  validate = async (email: string) => {
    const user = await getRepository(User).findOne({ where: { email } });
    return !user;
  };

  defaultMessage(validationArguments?: ValidationArguments): string {
    const dataObject = validationArguments.object as any;
    return `User with email ${dataObject.email} already exist`;
  }
}

// Check if user with id exist and return success
@ValidatorConstraint()
export class UserExistValidator implements ValidatorConstraintInterface {
  validate = async (email: string) => {
    const user = await getRepository(User).findOne({ where: { email } });
    return !!user;
  };

  defaultMessage(validationArguments?: ValidationArguments): string {
    const dataObject = validationArguments.object as any;
    return `User with email ${dataObject.email} does not exist`;
  }
}


@ValidatorConstraint()
export class UserExistById implements ValidatorConstraintInterface {
  validate = async (id: string) => {
    const user = await getRepository(User).findOne({ where: { id: Number(id) } });
    return !!user; // pass if true
  };

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `User with id ${validationArguments.value} does not exist.`;
  }
}
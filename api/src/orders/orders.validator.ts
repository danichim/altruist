import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getRepository } from 'typeorm';
import { ValidationArguments } from 'class-validator/validation/ValidationArguments';
import { Order } from "./order.entity";

@ValidatorConstraint()
export class OrdersExistValidator implements ValidatorConstraintInterface {
  validate = async (id: any) => {
    const order = await getRepository(Order).findOne({ where: { id } });
    return !!order;
  };

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Order with id ${validationArguments.value} does not exist`;
  }
}


@ValidatorConstraint()
export class OrderAlreadyCompleteValidator implements ValidatorConstraintInterface {
  validate = async (id: any) => {
    const order = await getRepository(Order).findOne({ where: { id, status: "done" } });
    if (order) {
      return false
    }
    return true
  };

  defaultMessage(validationArguments?: ValidationArguments): string {
    console.log({ validationArguments })
    return `Order has already been completed.`;
  }
}
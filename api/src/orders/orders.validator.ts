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
    const dataObject = validationArguments.object as any;
    return `Order with id ${dataObject.id} does not exist`;
  }
}

import { registerDecorator, ValidationOptions } from "class-validator";
import { OrderAlreadyCompleteValidator } from "src/orders/orders.validator";

export function IsOrderAlreadyDone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: OrderAlreadyCompleteValidator,
    });
  };
}
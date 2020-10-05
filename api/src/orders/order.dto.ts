import { IsString, Validate } from "class-validator";
import { OrdersExistValidator } from "./orders.validator";


export class FindOneOrder {
  @IsString()
  @Validate(OrdersExistValidator)
  id: number;
}

import { MaxLength, MinLength, Validate } from "class-validator/decorator/decorators";
import { Order } from "src/orders/order.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsOrderAlreadyDone } from "./report.validator";



@Entity({ name: 'report' })
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(5, {
        message: 'Subject is too short',
    })
    @MaxLength(50, {
        message: 'Subject is too long',
    })
    subject: string;

    @Column()
    @MinLength(5, {
        message: 'Message is too short',
    })
    @MaxLength(250, {
        message: 'Message is too long',
    })
    message: string;

    @IsOrderAlreadyDone()
    @ManyToOne(() => Order, order => order.id)
    order: Order;

}
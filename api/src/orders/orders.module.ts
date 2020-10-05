import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { OrderRepository } from "./orders.repository";
import { OrderService } from "./orders.service";
import { OrderController } from "./orders.controller";
import { PusherService } from "../shared/pusher.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, OrderRepository]),
  ],
  providers: [OrderService, PusherService],
  controllers: [OrderController],
})
export class OrdersModule {}

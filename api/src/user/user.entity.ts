import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import * as crypto from 'crypto';
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { Order } from "../orders/order.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  surname: string;

  @OneToMany(() => Order, order => order.created_by, {eager: true})
  orders: Order[];

  @OneToMany(() => Order, order => order.accepted_by, {eager: true})
  volunteer_orders: Order[];

  @IsNumber()
  @IsOptional()
  @Column()
  action_perimeter: number;

  @IsString()
  @Column()
  phone: string;

  @IsNumber()
  @IsOptional()
  @Column()
  latitude: number;

  @IsBoolean()
  @IsOptional()
  @Column()
  available: boolean;

  @IsNumber()
  @IsOptional()
  @Column()
  longitude: number;

  @IsString()
  @Column({ nullable: false, unique: true })
  email: string;

  @IsString()
  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await crypto.createHmac('sha256', this.password).digest('hex');
    }
  }
}

import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum, IsNumber, IsString } from "class-validator";
import { User } from "../user/user.entity";
import { ColumnNumericTransformer } from "./column-transformer";

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  title: string;

  @IsNumber()
  @Column('numeric', {
    precision: 11,
    scale: 8,
    transformer: new ColumnNumericTransformer(),
  })
  latitude: number;

  @IsNumber()
  @Column('numeric', {
    precision: 11,
    scale: 8,
    transformer: new ColumnNumericTransformer(),
  })
  longitude: number;

  @IsString()
  @Column()
  address: string;

  @IsString()
  @Column()
  expires_at: string;

  @IsString()
  @Column()
  description: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({name: "created_by"})
  created_by: User;

  @ManyToOne(() => User, user => user.volunteer_orders)
  @JoinColumn({name: "accepted_by"})
  accepted_by: User;

  @IsString()
  @Column()
  created_at: string;

  @IsEnum(['open', 'in progress', 'done', 'canceled'])
  @Column()
  status: string;
}

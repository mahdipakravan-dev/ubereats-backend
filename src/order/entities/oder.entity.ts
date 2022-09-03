import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  Pending = 'PENDING',
  Cooking = 'COOKING',
  Cooked = 'COOKED',
  PickedUp = 'PICKED_UP',
  Delivered = 'DELIVERED',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  //order has a customer
  @ManyToOne(() => User, (user) => user.order, {})
  @Field(() => User)
  customer: User;

  @RelationId((order: Order) => order.customer)
  customerId: number;

  //order has a driver
  @ManyToOne(() => User, (user) => user.rides)
  @Field(() => User, { nullable: true })
  driver?: User;

  @RelationId((order: Order) => order.driver)
  driverId: number;

  //order has a restaurant
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.order)
  @Field(() => Restaurant)
  restaurant: Restaurant;

  @RelationId((order: Order) => order.restaurant)
  restaurantId: number;

  //many order has many dishes
  @Field((type) => [OrderItem])
  @ManyToMany((type) => OrderItem, { eager: true })
  @JoinTable()
  items: OrderItem[];

  @Column({
    name: 'status',
    enumName: 'statusEnum',
    nullable: false,
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  @Field(() => OrderStatus, { defaultValue: OrderStatus.Pending })
  status: OrderStatus;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  totalPrice: number;
}

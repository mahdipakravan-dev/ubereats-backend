import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { OrderItemOption } from '../entities/order-item.entity';

@InputType()
class CreateOrderItemInput {
  @Field((type) => Int)
  dishId: number;

  @Field((type) => [OrderItemOption], { nullable: true })
  options?: OrderItemOption[];
}

@InputType()
export class CreateOrderDto {
  @Field((type) => Int)
  restaurantId: number;

  @Field((type) => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutputDto extends OutputDto {
  @Field((type) => Int, { nullable: true })
  orderId?: number;
}

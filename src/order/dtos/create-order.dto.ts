import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { DishChoiceItem } from '../../restaurants/entities/dish.entity';

@ObjectType()
class CreateOrderItemsInput {
  @Field(() => Number)
  dishId: number;

  @Field(() => DishChoiceItem, { nullable: true })
  options?: DishChoiceItem[];
}

@InputType()
export class CreateOrderDto {
  @Field(() => Number)
  restaurantId: number;

  @Field(() => [CreateOrderItemsInput])
  items: CreateOrderItemsInput[];
}

@ObjectType()
export class CreateOrderOutputDto extends OutputDto {}

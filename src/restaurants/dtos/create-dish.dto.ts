import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { Dish } from '../entities/dish.entity';

@InputType()
export class CreateDishDto extends PickType(Dish, [
  'name',
  'description',
  'photo',
  'options',
  'price',
]) {
  @Field(() => Number)
  restaurantId: number;
}

@ObjectType()
export class CreateDishOutputDto extends OutputDto {}

import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class CreateRestaurantDto extends PickType(Restaurant, [
  'address',
  'name',
  'avatar',
]) {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutputDto extends OutputDto {}

import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { CreateRestaurantDto } from './create-restaurant.dto';

@InputType()
export class EditRestaurantDto extends PartialType(CreateRestaurantDto) {
  @Field(() => Number)
  restaurantId: number;
}

@ObjectType()
export class EditRestaurantOutputDto extends OutputDto {}

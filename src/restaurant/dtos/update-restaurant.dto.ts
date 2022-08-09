import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}

@InputType()
export class UpdateRestaurantArgs {
  @Field(() => Number)
  id: Restaurant['id'];

  @Field(() => UpdateRestaurantDto)
  data: UpdateRestaurantDto;
}

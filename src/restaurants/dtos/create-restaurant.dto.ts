import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, [
  'id',
  'owner',
  'category',
]) {}

@ObjectType()
export class CreateRestaurantOutputDto extends OutputDto {}

import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class CreateRestaurantDto extends PickType(Restaurant, []) {}

@ObjectType()
export class CreateRestaurantOutputDto extends OutputDto {}

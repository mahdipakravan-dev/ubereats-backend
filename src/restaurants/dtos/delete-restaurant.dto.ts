import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';

@InputType()
export class DeleteRestaurantDto {
  @Field(() => Number)
  restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutputDto extends OutputDto {}

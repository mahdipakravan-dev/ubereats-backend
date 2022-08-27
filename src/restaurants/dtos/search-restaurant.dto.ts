import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import {
  PaginationDto,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';

@InputType()
export class SearchRestaurantDto extends PaginationDto {
  @Field(() => String)
  query: string;
}

@ObjectType()
export class SearchRestaurantOutputDto extends PaginationOutput {
  @Field(() => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}

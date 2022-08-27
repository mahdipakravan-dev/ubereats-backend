import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationDto,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class AllRestaurantsInput extends PaginationDto {}

@ObjectType()
export class AllRestaurantsOutput extends PaginationOutput {
  @Field((type) => [Restaurant], { nullable: true })
  results?: Restaurant[];
}

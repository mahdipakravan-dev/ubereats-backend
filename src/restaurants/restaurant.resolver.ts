import { Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

//This is Resolver of restaurant for graphQL
@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor() {}

  @Query(() => String)
  hi() {
    return 'Hi';
  }
}

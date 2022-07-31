import { Resolver, Query } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

//This is Resolver of restaurant
@Resolver(() => Restaurant)
export class RestaurantResolver {
  @Query(() => Restaurant)
  myRestaurant() {
    console.log('in my restaurant handler');
    return true;
  }
}

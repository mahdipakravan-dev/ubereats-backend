import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

//This is Resolver of restaurant
@Resolver(() => Restaurant)
export class RestaurantResolver {
  @Query(() => [Restaurant])
  restaurants(@Args('options') options: string): Array<Restaurant> {
    console.log('in my restaurant handler');
    return [];
  }

  @Mutation(() => Boolean)
  createRestaurant(
    @Args('createResturantInput') createResturantInput: CreateRestaurantDto,
  ): boolean {
    return true;
  }
}

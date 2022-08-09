import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';

//This is Resolver of restaurant
@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(() => [Restaurant])
  async restaurants(): Promise<Array<Restaurant>> {
    return this.restaurantService.getAll();
  }

  @Mutation(() => Boolean)
  async createRestaurant(
    @Args('input') createResturantInput: CreateRestaurantDto,
  ): Promise<boolean> {
    const result = this.restaurantService.createRestaurant(createResturantInput);
    return !!result
  }
}

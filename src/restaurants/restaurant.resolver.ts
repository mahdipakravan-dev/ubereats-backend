import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import {
  CreateRestaurantDto,
  CreateRestaurantOutputDto,
} from './dtos/create-restaurant.dto';
import { AuthUserDecorator } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { RestaurantService } from './restaurant.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

//This is Resolver of restaurant for graphQL
@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(() => String)
  hi() {
    return 'Hi';
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CreateRestaurantOutputDto)
  async restaurant_create(
    @AuthUserDecorator() user: User,
    @Args('input') input: CreateRestaurantDto,
  ): Promise<CreateRestaurantOutputDto> {
    try {
      await this.restaurantService.createRestaurant(user, input);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }
}

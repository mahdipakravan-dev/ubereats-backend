import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import {
  CreateRestaurantDto,
  CreateRestaurantOutputDto,
} from './dtos/create-restaurant.dto';
import { AuthUserDecorator } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { RestaurantService } from './restaurant.service';
import { Role } from '../auth/role.decorator';
import {
  EditRestaurantDto,
  EditRestaurantOutputDto,
} from './dtos/edit-restaurant.dto';
import {
  DeleteRestaurantDto,
  DeleteRestaurantOutputDto,
} from './dtos/delete-restaurant.dto';

//This is Resolver of restaurant for graphQL
@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(() => String)
  hi() {
    return 'Hi';
  }

  @Role(['OWNER'])
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

  @Role(['OWNER'])
  @Mutation(() => EditRestaurantOutputDto)
  async restaurant_edit(
    @AuthUserDecorator() user: User,
    @Args('input') input: EditRestaurantDto,
  ): Promise<EditRestaurantOutputDto> {
    try {
      await this.restaurantService.editRestaurant(user, input);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Role(['OWNER'])
  @Mutation(() => DeleteRestaurantOutputDto)
  async restaurant_delete(
    @AuthUserDecorator() user: User,
    @Args('input') input: DeleteRestaurantDto,
  ): Promise<EditRestaurantOutputDto> {
    try {
      await this.restaurantService.deleteRestaurant(user, input);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

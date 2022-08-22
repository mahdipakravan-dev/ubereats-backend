import { Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';

//This is Resolver of restaurant for graphQL
@Resolver(() => User)
export class UsersResolver {
  // constructor(private readonly usersService = UsersService) {}

  @Query(() => String)
  getThat(): string {
    return 'true';
  }
  // async restaurants(): Promise<Array<Restaurant>> {
  //   return this.restaurantService.getAll();
  // }
  //
  // @Mutation(() => Boolean)
  // async createRestaurant(
  //   @Args('input') createRestaurantInput: CreateRestaurantDto,
  // ): Promise<boolean> {
  //   try {
  //     await this.restaurantService.createRestaurant(createRestaurantInput);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }
  //
  // @Mutation(() => Boolean)
  // async updateRestaurant(
  //   @Args('input') updateRestaurantInput: UpdateRestaurantArgs,
  // ) {
  //   try {
  //     await this.restaurantService.updateRestaurant(updateRestaurantInput);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }
}

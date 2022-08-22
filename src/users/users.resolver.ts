import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import {
  CreateAccountDto,
  CreateAccountOutputDto,
} from './dtos/create-account.dto';
import { UsersService } from './users.service';

//This is Resolver of restaurant for graphQL
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  getThat(): string {
    return 'true';
  }

  @Mutation(() => CreateAccountOutputDto)
  async createRestaurant(
    @Args('input') createAccountDto: CreateAccountDto,
  ): Promise<CreateAccountOutputDto> {
    try {
      const { ok, error } = await this.usersService.createAccount(
        createAccountDto,
      );
      return {
        ok,
        error,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

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

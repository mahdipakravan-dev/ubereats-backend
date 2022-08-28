import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Dish } from './entities/dish.entity';
import { CreateDishDto, CreateDishOutputDto } from './dtos/create-dish.dto';
import { AuthUserDecorator } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Role } from '../auth/role.decorator';

//This is Resolver of Category for graphQL
@Resolver(() => Dish)
export class DishResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Role(['OWNER'])
  @Mutation(() => CreateDishOutputDto)
  async dish_create(
    @AuthUserDecorator() user: User,
    @Args('input') input: CreateDishDto,
  ): Promise<CreateDishOutputDto> {
    console.log(user, input);
    try {
      await this.restaurantService.createDish(user, { ...input });
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

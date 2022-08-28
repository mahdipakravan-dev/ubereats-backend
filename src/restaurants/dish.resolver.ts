import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Dish } from './entities/dish.entity';
import { CreateDishDto, CreateDishOutputDto } from './dtos/create-dish.dto';
import { AuthUserDecorator } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Role } from '../auth/role.decorator';
import { EditDishDto, EditDishOutputDto } from './dtos/edit-dish.dto';

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
      return this.restaurantService.createDish(user, { ...input });
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Role(['OWNER'])
  @Mutation(() => EditDishOutputDto)
  async dish_edit(
    @AuthUserDecorator() user: User,
    @Args('input') input: EditDishDto,
  ): Promise<EditDishOutputDto> {
    try {
      return await this.restaurantService.editDish(user, input);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Order } from './entities/oder.entity';
import { OrderService } from './order.service';
import { CreateOrderDto, CreateOrderOutputDto } from './dtos/create-order.dto';
import { AuthUserDecorator } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Role } from '../auth/role.decorator';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Role(['Any'])
  @Mutation(() => CreateOrderOutputDto)
  async order_create(
    @AuthUserDecorator() user: User,
    @Args('input') createOrderInput: CreateOrderDto,
  ) {
    return this.orderService.createOrder();
  }
}

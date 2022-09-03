import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Order } from './entities/oder.entity';
import { OrderService } from './order.service';
import { CreateOrderDto, CreateOrderOutputDto } from './dtos/create-order.dto';
import { AuthUserDecorator } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Role } from '../auth/role.decorator';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Role(['Any'])
  @Mutation(() => CreateOrderOutputDto)
  async order_create(
    @AuthUserDecorator() user: User,
    @Args('input') createOrderInput: CreateOrderDto,
  ) {
    return this.orderService.createOrder(user, createOrderInput);
  }

  @Query((returns) => GetOrdersOutput)
  @Role(['Any'])
  async order_getMany(
    @AuthUserDecorator() user: User,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.orderService.getOrders(user, getOrdersInput);
  }

  @Query((returns) => GetOrderOutput)
  @Role(['Any'])
  async order_getOne(
    @AuthUserDecorator() user: User,
    @Args('input') getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.orderService.getOrder(user, getOrderInput);
  }

  @Mutation((returns) => EditOrderOutput)
  @Role(['Any'])
  async order_edit(
    @AuthUserDecorator() user: User,
    @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.orderService.editOrder(user, editOrderInput);
  }

  @Mutation(() => Boolean)
  async isReady() {
    pubSub.publish('hotPotatos', {
      orderSubscription: 'its ready !!!' + new Date(),
    });
    return true;
  }

  @Subscription(() => String)
  orderSubscription() {
    return pubSub.asyncIterator('hotPotatos');
    // return 'So Hello...';
  }
}

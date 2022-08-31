import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User, UserRole } from '../users/entities/user.entity';
import { CreateOrderDto, CreateOrderOutputDto } from './dtos/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/oder.entity';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { OrderItem } from './entities/order-item.entity';
import { Dish } from '../restaurants/entities/dish.entity';
import { keyBy } from 'lodash';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly order: Repository<Order>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Dish) private readonly dishes: Repository<Dish>,
    @InjectRepository(Order) private readonly orders: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,
  ) {}

  async createOrder(
    customer: User,
    { restaurantId, items }: CreateOrderDto,
  ): Promise<CreateOrderOutputDto> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);
      if (!restaurant)
        throw new InternalServerErrorException('Restaurant not found');
      const dishes = keyBy(
        await Promise.all(
          items?.map((item) => this.dishes.findOneOrFail(item.dishId)),
        ),
        'id',
      );
      let finalValue = items.reduce((prevVal, currentItem) => {
        const currentValDishOptions = keyBy(
          dishes[currentItem.dishId].options.map((option) => ({
            ...option,
            choices: keyBy(option.choices, 'name'),
          })),
          'name',
        );
        const optionsPrice = currentItem.options.reduce(
          (prevValue, currentItem) => {
            const currentOptionOnDb = currentValDishOptions[currentItem.name];
            const choicePrice =
              currentOptionOnDb?.choices[currentItem.choice.toString()]?.price;
            if (!choicePrice)
              throw new InternalServerErrorException(
                'selected PriceItem not founded ',
              );

            return prevValue + choicePrice;
          },
          0,
        );
        return prevVal + dishes[currentItem.dishId].price + optionsPrice;
      }, 0);
      //   orderFinalPrice = orderFinalPrice + dishFinalPrice;
      //   const orderItem = await this.orderItems.save(
      //     this.orderItems.create({
      //       dish,
      //       options: item.options,
      //     }),
      //   );
      //   orderItems.push(orderItem);
      // }
      // const order = await this.orders.save(
      //   this.orders.create({
      //     customer,
      //     restaurant,
      //     totalPrice: orderFinalPrice,
      //     items: orderItems,
      //   }),
      // );
      // await this.pubSub.publish(NEW_PENDING_ORDER, {
      //   pendingOrders: { order, ownerId: restaurant.ownerId },
      // });
      return {
        ok: true,
        orderId: finalValue,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async getOrders(
    user: User,
    { status }: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    try {
      let orders: Order[];
      if (user.role === UserRole.CLIENT) {
        orders = await this.orders.find({
          where: {
            customer: user,
            ...(status && { status }),
          },
        });
      } else if (user.role === UserRole.DELIVERY) {
        orders = await this.orders.find({
          where: {
            driver: user,
            ...(status && { status }),
          },
        });
      } else if (user.role === UserRole.OWNER) {
        const restaurants = await this.restaurants.find({
          where: {
            owner: user,
          },
          relations: ['orders'],
        });
        orders = restaurants.map((restaurant) => restaurant.order).flat(1);
        if (status) {
          orders = orders.filter((order) => order.status === status);
        }
      }
      return {
        ok: true,
        orders,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not get orders',
      };
    }
  }

  canSeeOrder(user: User, order: Order): boolean {
    let canSee = true;
    if (user.role === UserRole.CLIENT && order.customerId !== user.id) {
      canSee = false;
    }
    if (user.role === UserRole.DELIVERY && order.driverId !== user.id) {
      canSee = false;
    }
    if (user.role === UserRole.OWNER && order.restaurant.ownerId !== user.id) {
      canSee = false;
    }
    return canSee;
  }

  async getOrder(
    user: User,
    { id: orderId }: GetOrderInput,
  ): Promise<GetOrderOutput> {
    try {
      const order = await this.orders.findOne(orderId, {
        relations: ['restaurant'],
      });
      if (!order) {
        return {
          ok: false,
          error: 'Order not found.',
        };
      }

      if (!this.canSeeOrder(user, order)) {
        return {
          ok: false,
          error: 'You cant see that',
        };
      }
      return {
        ok: true,
        order,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load order.',
      };
    }
  }

  async editOrder(
    user: User,
    { id: orderId, status }: EditOrderInput,
  ): Promise<EditOrderOutput> {
    try {
      const order = await this.orders.findOne(orderId);
      if (!order) {
        return {
          ok: false,
          error: 'Order not found.',
        };
      }
      if (!this.canSeeOrder(user, order)) {
        return {
          ok: false,
          error: "Can't see this.",
        };
      }
      let canEdit = true;
      if (user.role === UserRole.CLIENT) {
        canEdit = false;
      }
      if (user.role === UserRole.OWNER) {
        if (status !== OrderStatus.Cooking && status !== OrderStatus.Cooked) {
          canEdit = false;
        }
      }
      if (user.role === UserRole.DELIVERY) {
        if (
          status !== OrderStatus.PickedUp &&
          status !== OrderStatus.Delivered
        ) {
          canEdit = false;
        }
      }
      if (!canEdit) {
        return {
          ok: false,
          error: "You can't do that.",
        };
      }
      await this.orders.save({
        id: orderId,
        status,
      });
      const newOrder = { ...order, status };
      if (user.role === UserRole.OWNER) {
        if (status === OrderStatus.Cooked) {
          // await this.pubSub.publish(NEW_COOKED_ORDER, {
          //   cookedOrders: newOrder,
          // });
        }
      }
      // await this.pubSub.publish(NEW_ORDER_UPDATE, { orderUpdates: newOrder });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit order.',
      };
    }
  }
}

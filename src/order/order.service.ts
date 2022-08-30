import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto, CreateOrderOutputDto } from './dtos/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/oder.entity';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { OrderItem } from './entities/order-item.entity';
import { Dish } from '../restaurants/entities/dish.entity';
import { keyBy } from 'lodash';

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
}

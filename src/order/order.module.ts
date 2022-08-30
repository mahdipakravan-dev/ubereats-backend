import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/oder.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { Dish } from '../restaurants/entities/dish.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Dish, Restaurant, OrderItem]),
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}

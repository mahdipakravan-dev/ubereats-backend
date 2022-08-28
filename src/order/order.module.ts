import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/oder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurant.resolver';

@Module({
  providers: [RestaurantResolver],
})
export class RestaurantModule {}

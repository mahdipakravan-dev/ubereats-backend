import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category])],
  providers: [RestaurantService, RestaurantResolver],
  exports: [RestaurantService],
})
export class RestaurantModule {}

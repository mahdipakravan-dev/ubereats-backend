import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryResolver } from './category.resolver';
import { Dish } from './entities/dish.entity';
import { DishResolver } from './dish.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository, Dish])],
  providers: [
    RestaurantService,
    RestaurantResolver,
    CategoryResolver,
    DishResolver,
  ],
  exports: [RestaurantService],
})
export class RestaurantModule {}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { User } from '../users/entities/user.entity';
import {
  CreateRestaurantDto,
  CreateRestaurantOutputDto,
} from './dtos/create-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
    @InjectRepository(Restaurant)
    private readonly restaurant: Repository<Restaurant>,
  ) {}

  async createRestaurant(
    user: User,
    restaurant: CreateRestaurantDto,
  ): Promise<CreateRestaurantOutputDto> {
    try {
      const newRestaurant = this.restaurant.create(restaurant);
      newRestaurant.owner = user;
      const categoryName = restaurant.categoryName.trim().toLowerCase();
      const slug = categoryName.replace(/ /g, '-');
      let category = await this.categories.findOne({ slug });
      if (!category) {
        category = await this.categories.save(
          this.categories.create({ name: categoryName, slug }),
        );
      }
      newRestaurant.category = category;
      await this.restaurant.save(newRestaurant);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        error: e,
        ok: false,
      };
    }
  }
}

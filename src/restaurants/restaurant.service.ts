import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { User } from '../users/entities/user.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurant: Repository<Restaurant>,
  ) {}

  async createRestaurant(user: User, restaurant: CreateRestaurantDto) {
    const newRestaurant = this.restaurant.create(restaurant);
    newRestaurant.owner = user;
    return this.restaurant.save(newRestaurant);
  }
}

import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantArgs } from './dtos/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Array<Restaurant>> {
    return this.restaurants.find({});
  }
  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const createdRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(createdRestaurant);
  }
  updateRestaurant(
    updateRestaurantDto: UpdateRestaurantArgs,
  ): Promise<UpdateResult> {
    return this.restaurants.update(
      { id: updateRestaurantDto.id },
      updateRestaurantDto.data,
    );
  }
}
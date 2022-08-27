import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { Restaurant } from './restaurant.entity';

@InputType('RestaurantDishType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  @Length(5)
  name: string;

  @Column()
  @Field(() => Number)
  @IsNumber()
  price: number;

  @Column()
  @Field(() => String)
  @IsString()
  photo: string;

  @Column()
  @Field(() => String)
  @IsString()
  @Length(5, 140)
  description: string;

  //Dish has one Restaurant
  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.dishes, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  restaurant: Restaurant;
}

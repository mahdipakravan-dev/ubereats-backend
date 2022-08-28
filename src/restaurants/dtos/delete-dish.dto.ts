import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { Dish } from '../entities/dish.entity';

@InputType()
export class DeleteDishDto extends PickType(Dish, ['id']) {}

@ObjectType()
export class DeleteDishOutputDto extends OutputDto {}

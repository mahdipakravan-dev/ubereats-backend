import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/restaurant.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class CreateRestaurantDto extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutputDto extends OutputDto {}

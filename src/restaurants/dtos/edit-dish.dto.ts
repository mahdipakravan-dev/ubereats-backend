import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { CreateDishDto } from './create-dish.dto';

@InputType()
export class EditDishDto extends PartialType(
  OmitType(CreateDishDto, ['restaurantId']),
) {
  @Field(() => Number)
  dishId: number;
}

@ObjectType()
export class EditDishOutputDto extends OutputDto {}

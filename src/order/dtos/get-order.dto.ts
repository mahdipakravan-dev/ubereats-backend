import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Order } from '../entities/oder.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class GetOrderInput extends PickType(Order, ['id']) {}

@ObjectType()
export class GetOrderOutput extends OutputDto {
  @Field((type) => Order, { nullable: true })
  order?: Order;
}

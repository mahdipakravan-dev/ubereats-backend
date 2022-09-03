import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Order } from '../entities/oder.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class GetOrderInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class GetOrderOutput extends OutputDto {
  @Field((type) => Order, { nullable: true })
  order?: Order;
}

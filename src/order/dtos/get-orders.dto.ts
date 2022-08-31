import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Order, OrderStatus } from '../entities/oder.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class GetOrdersInput {
  @Field((type) => OrderStatus, { nullable: true })
  status?: OrderStatus;
}

@ObjectType()
export class GetOrdersOutput extends OutputDto {
  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}

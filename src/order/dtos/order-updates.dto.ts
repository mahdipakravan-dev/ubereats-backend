import { InputType, PickType } from '@nestjs/graphql';
import { Order } from '../entities/oder.entity';

@InputType()
export class OrderUpdatesInput extends PickType(Order, ['id']) {}

import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Order } from '../entities/oder.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class EditOrderInput extends PickType(Order, ['id', 'status']) {}

@ObjectType()
export class EditOrderOutput extends OutputDto {}

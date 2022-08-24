import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { OutputDto } from '../../dto/output';

@InputType()
export class EditAccountInputDto extends PartialType(User) {}

@ObjectType()
export class EditAccountOutputDto extends OutputDto {}

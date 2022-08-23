import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { User } from '../entities/user.entity';

@InputType()
export class LoginDto extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutputDto extends OutputDto {
  @Field(() => String, { nullable: true })
  token?: string;
}

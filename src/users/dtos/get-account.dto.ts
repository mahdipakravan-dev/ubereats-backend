import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field(() => String)
  userId: string;
}

@ObjectType()
export class UserProfileOutputDto extends OutputDto {
  @Field(() => User, { nullable: true })
  user?: User;
}

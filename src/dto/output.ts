import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OutputDto {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Boolean)
  ok: boolean;
}

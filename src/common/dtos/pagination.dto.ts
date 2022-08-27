import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';

@InputType()
export class PaginationDto {
  @Field(() => Number, { defaultValue: 1 })
  page?: number;
}

@ObjectType()
export class PaginationOutput extends OutputDto {
  @Field(() => Number, { nullable: true })
  pageNumber?: number;

  @Field(() => Number, { nullable: true })
  totalPages?: number;
}

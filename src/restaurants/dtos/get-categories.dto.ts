import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import {
  PaginationDto,
  PaginationOutput,
} from '../../common/dtos/pagination.dto';

@InputType()
export class CategoryDto extends PaginationDto {
  @Field(() => String)
  slug: string;
}

@ObjectType()
export class CategoryOutput extends PaginationOutput {
  @Field(() => Category, { nullable: true })
  category?: Category;
}

import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { Category } from '../entities/category.entity';

@ArgsType()
export class CategoryDto {
  @Field(() => String)
  slug: string;
}

@ObjectType()
export class CategoryOutput extends OutputDto {
  @Field(() => Category, { nullable: true })
  category?: Category;
}

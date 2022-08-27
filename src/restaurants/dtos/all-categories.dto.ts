import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { Category } from '../entities/category.entity';

@InputType()
export class AllCategoriesDto {}

@ObjectType()
export class AllCategoriesOutputDto extends OutputDto {
  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}

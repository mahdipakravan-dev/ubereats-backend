import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  @Length(5)
  name: string;

  @Column({ default: 'default-avatar.png' })
  @Field(() => String, { defaultValue: 'default-avatar.png' })
  @IsString()
  avatar: string;

  //Category has many restaurants
  @Field(() => [Restaurant])
  @OneToMany(() => Restaurant, (restaurant) => restaurant.category)
  @JoinColumn()
  restaurants: Restaurant[];

  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  slug: string;
}

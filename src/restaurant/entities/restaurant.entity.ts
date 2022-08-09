import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// isAbstract call you not use it directly and you use it as abstract class (extends or implements)
@InputType({ isAbstract: true })
//👇for graphQl Automaticly generate schema👇
@ObjectType()
//👇for typeORM👇
@Entity()
export class Restaurant {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Boolean, { defaultValue : true})
  @Column({ default: false })
  isVegan?: boolean;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  ownerName: string;

  @Field(() => String , {defaultValue : "UNKNOWN"})
  @Column({default : ""})
  categoryName?: string;
}

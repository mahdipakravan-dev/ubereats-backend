import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from './user.entity';

@InputType('VerificationInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field(() => String)
  code: string;

  @OneToOne(() => User, {
    onDelete: 'CASCADE' /*delete this record when user deleted*/,
  })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode() {
    this.code = Math.floor(Math.random() * 9999).toString();
  }
}

import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { OutputDto } from '../../dto/output';
import { Verification } from '../entities/verification.entity';

@InputType()
export class VerifyAccountInputDto extends PickType(Verification, ['code']) {}

@ObjectType()
export class VerifyAccountOutputDto extends OutputDto {}

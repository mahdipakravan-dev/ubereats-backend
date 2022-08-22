import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

export type UserRole = 'client' | 'owner' | 'delivery';

@Entity()
export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}

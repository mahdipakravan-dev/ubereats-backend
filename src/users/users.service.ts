import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<{ ok: boolean; error?: string }> {
    const exist = await this.users.findOne(
      { email: createAccountDto.email },
      {},
    );
    if (exist)
      return {
        ok: false,
        error: 'There is a user already with this email',
      };
    try {
      await this.users.save(this.users.create(createAccountDto));
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Internal',
      };
    }
  }
}

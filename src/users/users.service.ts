import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { LoginDto, LoginOutputDto } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
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

  async login(loginData: LoginDto): Promise<LoginOutputDto> {
    try {
      const user = await this.users.findOne({ email: loginData.email });
      if (!user)
        return {
          ok: false,
          error: 'User Not Found',
        };
      const isCorrect = await user.checkPassword(loginData.password);
      if (!isCorrect)
        return {
          ok: false,
          error: 'Wrong Password',
        };
      const token = this.jwtService.sign({ id: user.id });
      return {
        ok: true,
        token,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async findById(id: string): Promise<User> {
    return this.users.findOne({ id });
  }
}

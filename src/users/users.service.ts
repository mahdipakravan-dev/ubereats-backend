import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { LoginAccountDto, LoginOutputDto } from './dtos/login-account.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';
import { Verification } from './entities/verification.entity';
import { VerifyAccountOutputDto } from './dtos/verify-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
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
      const user = await this.users.save(this.users.create(createAccountDto));
      await this.verification.save(
        this.verification.create({
          user,
        }),
      );
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

  async login(loginData: LoginAccountDto): Promise<LoginOutputDto> {
    try {
      const user = await this.users.findOne(
        { email: loginData.email },
        { select: ['password'] },
      );
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

  async edit(id: string, editValue: Partial<User>) {
    return this.users.update({ id }, { ...editValue });
  }

  async verify(code: string): Promise<VerifyAccountOutputDto> {
    try {
      const verification = await this.verification.findOne(
        { code },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        await this.users.save({ ...verification.user });
        await this.verification.delete(verification.id);
        return { ok: true };
      }
      return { ok: false, error: 'Verification not found.' };
    } catch (error) {
      return { ok: false, error: 'Could not verify email.' };
    }
  }
}

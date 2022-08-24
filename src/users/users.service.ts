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
import { UserCheckerHelper } from './userCheckerHelper';
import { NotifierService } from '../notifier/notifier.service';
import { NotifiersEnum } from '../notifier/notifier.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly notifierService: NotifierService,
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
      const verification = await this.verification.save(
        this.verification.create({
          user,
        }),
      );
      await this.notifierService.send(NotifiersEnum.EMAIL, {
        message: `Verify your account using this code : ${verification.code}`,
        subject: `Hi ${user.email} , Please Verify !`,
        email: user.email,
      });
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
        { select: ['password', 'verified'] },
      );
      const checkUserResult = await new UserCheckerHelper(
        user,
      ).checkLoginRequirement(loginData.password);
      if (!checkUserResult.ok) return checkUserResult;
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

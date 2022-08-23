import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import {
  CreateAccountDto,
  CreateAccountOutputDto,
} from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { LoginDto, LoginOutputDto } from './dtos/login.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUserDecorator } from '../auth/auth-user.decorator';
import {
  UserProfileInput,
  UserProfileOutputDto,
} from './dtos/user-account.dto';

//This is Resolver of restaurant for graphQL
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreateAccountOutputDto)
  async register(
    @Args('input') createAccountDto: CreateAccountDto,
  ): Promise<CreateAccountOutputDto> {
    try {
      const { ok, error } = await this.usersService.createAccount(
        createAccountDto,
      );
      return {
        ok,
        error,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  @Mutation(() => LoginOutputDto)
  async login(@Args('input') loginInput: LoginDto): Promise<LoginOutputDto> {
    return await this.usersService.login(loginInput);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  me(@AuthUserDecorator() user: User): User {
    return user;
  }

  @UseGuards(AuthGuard)
  @Query(() => UserProfileOutputDto)
  async user(@Args() userProfileInput: UserProfileInput) {
    try {
      const user = await this.usersService.findById(userProfileInput.userId);
      if (!user) {
        return {
          ok: false,
          error: 'NotFound',
        };
      }
      return {
        ok: true,
        user,
      };
    } catch (e) {
      return {
        error: e,
        ok: false,
      };
    }
  }
}

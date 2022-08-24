import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import {
  CreateAccountDto,
  CreateAccountOutputDto,
} from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { LoginAccountDto, LoginOutputDto } from './dtos/login-account.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUserDecorator } from '../auth/auth-user.decorator';
import { UserProfileInput, UserProfileOutputDto } from './dtos/get-account.dto';
import {
  EditAccountInputDto,
  EditAccountOutputDto,
} from './dtos/edit-account-input.dto';
import {
  VerifyAccountInputDto,
  VerifyAccountOutputDto,
} from './dtos/verify-account.dto';

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
  async login(
    @Args('input') loginInput: LoginAccountDto,
  ): Promise<LoginOutputDto> {
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

  @UseGuards(AuthGuard)
  @Mutation(() => EditAccountOutputDto)
  async editProfile(
    @AuthUserDecorator() authUser: User,
    @Args('input') editPartial: EditAccountInputDto,
  ) {
    try {
      const user = await this.usersService.edit(authUser.id, editPartial);
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

  @Mutation(() => VerifyAccountOutputDto)
  async verifyAccount(
    @Args('input') input: VerifyAccountInputDto,
  ): Promise<VerifyAccountOutputDto> {
    try {
      await this.usersService.verify(input.code);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

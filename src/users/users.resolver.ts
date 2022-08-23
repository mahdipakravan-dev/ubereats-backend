import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import {
  CreateAccountDto,
  CreateAccountOutputDto,
} from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { LoginDto, LoginOutputDto } from './dtos/login.dto';

//This is Resolver of restaurant for graphQL
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  getThat(): string {
    return 'true';
  }

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
  me(@Context('user') user): User {
    console.log('USER ', user);
    return user;
  }
}

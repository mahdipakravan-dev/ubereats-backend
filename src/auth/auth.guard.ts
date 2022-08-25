import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './role.decorator';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<AllowedRoles>('role', context.getHandler());
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const [isPublicRoute, isUserAvailable] = [!role, gqlContext['user']];
    if (isPublicRoute) return true;
    if (!isUserAvailable) return false;
    const user: User = gqlContext['user'];
    return Boolean(
      role.includes(user.role.toUpperCase()) || role.includes('Any'),
    );
  }
}

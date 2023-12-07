import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/roles.decorator';

function matchRoles(roles: string[], userRoles: string): boolean {
  return roles.some((role) => userRoles === role);
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    //console.log('roles', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    //console.log('request', request);
    // const user = request.user;
    // return matchRoles(roles, user.roles);
    return true;
  }
}

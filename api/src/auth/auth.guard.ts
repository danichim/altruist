import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { jwtSignature } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization.split(' ')[1].trim();

    const jwtService = new JwtService({
      secret: jwtSignature,
    });

    let userData = null;

    try {
      userData = jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException();
    }

    request.user = jwtService.decode(token);

    return true;
  }
}

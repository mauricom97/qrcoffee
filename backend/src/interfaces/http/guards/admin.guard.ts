import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { UserRole } from '@infrastructure/prisma/generated';
import type { RequestUser } from '../decorators/company.decorator';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: RequestUser }>();
    const user = request.user;
    if (!user || user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Apenas administradores podem acessar este recurso.');
    }
    return true;
  }
}

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@infrastructure/prisma/generated';
import { PermissionsService } from '@application/permissions/permissions.service';
import type { PanelPermissionCode } from '@application/permissions/panel-permissions';
import { PANEL_PERMISSION_METADATA_KEY } from '../decorators/require-permission.decorator';
import type { RequestUser } from '../decorators/company.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const raw = this.reflector.getAllAndOverride<
      PanelPermissionCode | PanelPermissionCode[] | undefined
    >(PANEL_PERMISSION_METADATA_KEY, [context.getHandler(), context.getClass()]);
    const required = Array.isArray(raw) ? raw : raw != null ? [raw] : [];
    if (required.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest<{ user: RequestUser }>();
    const user = request.user;
    if (!user) {
      throw new ForbiddenException();
    }
    if (user.role === UserRole.ADMIN) {
      return true;
    }
    const effective = await this.permissionsService.getEffectivePanelPermissions(user.uuid, user.role);
    for (const code of required) {
      if (!effective.includes(code)) {
        throw new ForbiddenException('Sem permissão para acessar este recurso.');
      }
    }
    return true;
  }
}

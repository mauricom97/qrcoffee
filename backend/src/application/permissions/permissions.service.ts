import { Injectable } from '@nestjs/common';
import { UserRole } from '@infrastructure/prisma/generated';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import {
  ALL_PANEL_PERMISSION_CODES,
  normalizePanelPermissions,
  type PanelPermissionCode,
} from './panel-permissions';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Permissoes efetivas: ADMIN = todas; STAFF = uniao das permissoes dos grupos. */
  async getEffectivePanelPermissions(userUuid: string, role: UserRole): Promise<PanelPermissionCode[]> {
    if (role === UserRole.ADMIN) {
      return [...ALL_PANEL_PERMISSION_CODES];
    }
    const members = await this.prisma.client.userGroupMember.findMany({
      where: { userUuid },
      select: { group: { select: { permissions: true } } },
    });
    const merged = new Set<PanelPermissionCode>();
    for (const m of members) {
      for (const p of normalizePanelPermissions(m.group.permissions)) {
        merged.add(p);
      }
    }
    return Array.from(merged);
  }
}

import { SetMetadata } from '@nestjs/common';
import type { PanelPermissionCode } from '@application/permissions/panel-permissions';

export const PANEL_PERMISSION_METADATA_KEY = 'panelPermission';

/** Todas as permissões listadas são exigidas (AND). */
export const RequirePanelPermission = (...codes: PanelPermissionCode[]) =>
  SetMetadata(PANEL_PERMISSION_METADATA_KEY, codes);

import { SetMetadata } from '@nestjs/common';
import type { PanelPermissionCode } from '@application/permissions/panel-permissions';

export const PANEL_PERMISSION_METADATA_KEY = 'panelPermission';

export const RequirePanelPermission = (code: PanelPermissionCode) =>
  SetMetadata(PANEL_PERMISSION_METADATA_KEY, code);

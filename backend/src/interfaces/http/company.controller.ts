import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { PANEL_PERMISSION_CODES } from '@application/permissions/panel-permissions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RequirePanelPermission } from './decorators/require-permission.decorator';
import { CompanyUuid } from './decorators/company.decorator';
import type { KitchenHoursPayload } from '@domain/company/kitchen-hours';
import { RealtimeGateway } from '@interfaces/websocket/realtime.gateway';

export type MenuTheme = {
  primary?: string;
  primaryHover?: string;
  background?: string;
  accent?: string;
  textPrimary?: string;
  textMuted?: string;
};

@Controller('company')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePanelPermission(PANEL_PERMISSION_CODES.SETTINGS)
export class CompanyController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly realtime: RealtimeGateway,
  ) {}

  @Get('menu-theme')
  async getMenuTheme(@CompanyUuid() companyUuid: string) {
    const company = await this.prisma.client.company.findUnique({
      where: { uuid: companyUuid },
      select: { menuTheme: true },
    });
    if (!company) return { theme: null };
    try {
      const theme = company.menuTheme ? (JSON.parse(company.menuTheme) as MenuTheme) : null;
      return { theme };
    } catch {
      return { theme: null };
    }
  }

  @Patch('menu-theme')
  async updateMenuTheme(
    @CompanyUuid() companyUuid: string,
    @Body() body: { theme: MenuTheme | null },
  ) {
    const themeJson = body.theme ? JSON.stringify(body.theme) : null;
    await this.prisma.client.company.update({
      where: { uuid: companyUuid },
      data: { menuTheme: themeJson },
    });
    return { theme: body.theme };
  }

  @Get('sound-on-order-ready')
  async getSoundOnOrderReady(@CompanyUuid() companyUuid: string) {
    const company = await this.prisma.client.company.findUnique({
      where: { uuid: companyUuid },
      select: { soundOnOrderReady: true },
    });
    return { soundOnOrderReady: company?.soundOnOrderReady ?? true };
  }

  @Patch('sound-on-order-ready')
  async updateSoundOnOrderReady(
    @CompanyUuid() companyUuid: string,
    @Body() body: { soundOnOrderReady: boolean },
  ) {
    await this.prisma.client.company.update({
      where: { uuid: companyUuid },
      data: { soundOnOrderReady: body.soundOnOrderReady },
    });
    return { soundOnOrderReady: body.soundOnOrderReady };
  }

  @Get('kitchen-hours')
  async getKitchenHours(@CompanyUuid() companyUuid: string) {
    const company = await this.prisma.client.company.findUnique({
      where: { uuid: companyUuid },
      select: { kitchenHours: true },
    });
    if (!company?.kitchenHours?.trim()) {
      return { kitchenHours: null as KitchenHoursPayload | null };
    }
    try {
      const parsed = JSON.parse(company.kitchenHours) as KitchenHoursPayload;
      return { kitchenHours: parsed };
    } catch {
      return { kitchenHours: null as KitchenHoursPayload | null };
    }
  }

  @Patch('kitchen-hours')
  async updateKitchenHours(
    @CompanyUuid() companyUuid: string,
    @Body() body: { kitchenHours: KitchenHoursPayload | null },
  ) {
    let json: string | null = null;
    if (body.kitchenHours?.intervals?.length) {
      json = JSON.stringify({
        timezone: body.kitchenHours.timezone,
        intervals: body.kitchenHours.intervals,
      });
    }
    await this.prisma.client.company.update({
      where: { uuid: companyUuid },
      data: { kitchenHours: json },
    });
    this.realtime.emitMenuUpdate(companyUuid);
    return { kitchenHours: body.kitchenHours };
  }
}

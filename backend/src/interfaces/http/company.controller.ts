import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CompanyUuid } from './decorators/company.decorator';

export type MenuTheme = {
  primary?: string;
  primaryHover?: string;
  background?: string;
  accent?: string;
  textPrimary?: string;
  textMuted?: string;
};

@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly prisma: PrismaService) {}

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
}

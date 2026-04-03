import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@application/auth/auth.service';
import type { RegisterCompanyInput, LoginInput } from '@application/auth/auth.service';
import { PermissionsService } from '@application/permissions/permissions.service';
import { UserRole } from '@infrastructure/prisma/generated';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterCompanyInput) {
    return this.authService.register({
      companyName: body.companyName,
      userName: body.userName,
      email: body.email,
      password: body.password,
    });
  }

  @Post('login')
  async login(@Body() body: LoginInput) {
    return this.authService.login({
      email: body.email,
      password: body.password,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(
    @Req()
    req: {
      user: {
        uuid: string;
        email: string;
        name: string;
        role: string;
        companyUuid: string;
        company: { name: string };
      };
    },
  ) {
    const permissions = await this.permissionsService.getEffectivePanelPermissions(
      req.user.uuid,
      req.user.role as UserRole,
    );
    return {
      uuid: req.user.uuid,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      permissions,
      companyUuid: req.user.companyUuid,
      companyName: req.user.company.name,
    };
  }
}

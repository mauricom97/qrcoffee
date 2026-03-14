import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, RegisterCompanyInput, LoginInput } from '@application/auth/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async me(@Req() req: { user: { uuid: string; email: string; name: string; companyUuid: string; company: { name: string } } }) {
    return {
      uuid: req.user.uuid,
      email: req.user.email,
      name: req.user.name,
      companyUuid: req.user.companyUuid,
      companyName: req.user.company.name,
    };
  }
}

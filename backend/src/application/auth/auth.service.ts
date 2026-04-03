import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@infrastructure/prisma/generated';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

export interface RegisterCompanyInput {
  companyName: string;
  userName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  accessToken: string;
  user: {
    uuid: string;
    email: string;
    name: string;
    role: UserRole;
    companyUuid: string;
    companyName: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterCompanyInput): Promise<AuthResult> {
    const existing = await this.prisma.client.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const company = await this.prisma.client.company.create({
      data: {
        name: input.companyName,
      },
    });

    const user = await this.prisma.client.user.create({
      data: {
        email: input.email.toLowerCase(),
        passwordHash,
        name: input.userName,
        companyUuid: company.uuid,
        role: UserRole.ADMIN,
      },
      include: { company: true },
    });

    return this.buildAuthResult(user);
  }

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await this.prisma.client.user.findUnique({
      where: { email: input.email.toLowerCase() },
      include: { company: true },
    });
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    return this.buildAuthResult(user);
  }

  async validateUserByUuid(uuid: string) {
    return this.prisma.client.user.findUnique({
      where: { uuid },
      select: {
        uuid: true,
        email: true,
        name: true,
        role: true,
        companyUuid: true,
        company: { select: { name: true } },
      },
    });
  }

  private buildAuthResult(user: {
    uuid: string;
    email: string;
    name: string;
    role: UserRole;
    companyUuid: string;
    company: { name: string };
  }): AuthResult {
    const payload = {
      sub: user.uuid,
      email: user.email,
      companyUuid: user.companyUuid,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      user: {
        uuid: user.uuid,
        email: user.email,
        name: user.name,
        role: user.role,
        companyUuid: user.companyUuid,
        companyName: user.company.name,
      },
    };
  }
}

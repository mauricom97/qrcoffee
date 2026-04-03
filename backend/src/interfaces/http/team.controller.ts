import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@infrastructure/prisma/generated';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { CompanyUuid, CurrentUser } from './decorators/company.decorator';
import type { RequestUser } from './decorators/company.decorator';
import { AdminGuard } from './guards/admin.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('team')
@UseGuards(JwtAuthGuard, AdminGuard)
export class TeamController {
  constructor(private readonly prisma: PrismaService) {}

  /** Quantos administradores existem na empresa, opcionalmente excluindo um usuário. */
  private async otherAdminCount(companyUuid: string, excludeUserUuid: string): Promise<number> {
    return this.prisma.client.user.count({
      where: {
        companyUuid,
        role: UserRole.ADMIN,
        NOT: { uuid: excludeUserUuid },
      },
    });
  }

  @Get('users')
  async listUsers(@CompanyUuid() companyUuid: string) {
    const users = await this.prisma.client.user.findMany({
      where: { companyUuid },
      select: {
        uuid: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        groupMembers: {
          select: {
            group: { select: { uuid: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
    return users.map(({ groupMembers, ...u }) => ({
      ...u,
      groups: groupMembers.map((m) => m.group),
    }));
  }

  @Post('users')
  async createUser(
    @CompanyUuid() companyUuid: string,
    @Body() body: { email: string; name: string; password: string; role?: UserRole },
  ) {
    const email = body.email?.trim().toLowerCase();
    const name = body.name?.trim();
    const password = body.password;
    if (!email || !name || !password) {
      throw new BadRequestException('E-mail, nome e senha são obrigatórios.');
    }
    if (password.length < 6) {
      throw new BadRequestException('A senha deve ter pelo menos 6 caracteres.');
    }
    const role = body.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.STAFF;

    const existing = await this.prisma.client.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.client.user.create({
      data: {
        email,
        name,
        passwordHash,
        companyUuid,
        role,
      },
      select: {
        uuid: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    return { ...user, groups: [] as { uuid: string; name: string }[] };
  }

  @Patch('users/:uuid')
  async updateUser(
    @CompanyUuid() companyUuid: string,
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() body: { name?: string; role?: UserRole },
  ) {
    const user = await this.prisma.client.user.findFirst({
      where: { uuid, companyUuid },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const data: { name?: string; role?: UserRole } = {};
    if (body.name !== undefined) {
      const name = body.name.trim();
      if (!name) throw new BadRequestException('Nome inválido.');
      data.name = name;
    }
    if (body.role !== undefined) {
      if (body.role !== UserRole.ADMIN && body.role !== UserRole.STAFF) {
        throw new BadRequestException('Papel inválido.');
      }
      if (user.role === UserRole.ADMIN && body.role === UserRole.STAFF) {
        const others = await this.otherAdminCount(companyUuid, uuid);
        if (others < 1) {
          throw new ForbiddenException('Deve haver pelo menos um administrador na empresa.');
        }
      }
      data.role = body.role;
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Nada para atualizar.');
    }

    await this.prisma.client.user.update({
      where: { uuid },
      data,
    });

    const updated = await this.prisma.client.user.findFirst({
      where: { uuid, companyUuid },
      select: {
        uuid: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        groupMembers: {
          select: {
            group: { select: { uuid: true, name: true } },
          },
        },
      },
    });
    if (!updated) return null;
    const { groupMembers, ...u } = updated;
    return { ...u, groups: groupMembers.map((m) => m.group) };
  }

  @Delete('users/:uuid')
  async deleteUser(
    @CompanyUuid() companyUuid: string,
    @CurrentUser() current: RequestUser,
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ) {
    if (uuid === current.uuid) {
      throw new ForbiddenException('Você não pode remover a si mesmo.');
    }
    const user = await this.prisma.client.user.findFirst({
      where: { uuid, companyUuid },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    if (user.role === UserRole.ADMIN) {
      const others = await this.otherAdminCount(companyUuid, uuid);
      if (others < 1) {
        throw new ForbiddenException('Não é possível remover o único administrador da empresa.');
      }
    }
    await this.prisma.client.user.delete({ where: { uuid } });
    return { ok: true };
  }

  @Get('groups')
  async listGroups(@CompanyUuid() companyUuid: string) {
    const groups = await this.prisma.client.userGroup.findMany({
      where: { companyUuid },
      select: {
        uuid: true,
        name: true,
        createdAt: true,
        members: {
          select: {
            user: {
              select: { uuid: true, email: true, name: true, role: true },
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });
    return groups.map(({ members, ...g }) => ({
      ...g,
      users: members.map((m) => m.user),
    }));
  }

  @Post('groups')
  async createGroup(@CompanyUuid() companyUuid: string, @Body() body: { name: string }) {
    const name = body.name?.trim();
    if (!name) {
      throw new BadRequestException('Nome do grupo é obrigatório.');
    }
    return this.prisma.client.userGroup.create({
      data: { name, companyUuid },
      select: { uuid: true, name: true, createdAt: true },
    });
  }

  @Patch('groups/:uuid')
  async updateGroup(
    @CompanyUuid() companyUuid: string,
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() body: { name: string },
  ) {
    const group = await this.prisma.client.userGroup.findFirst({
      where: { uuid, companyUuid },
    });
    if (!group) {
      throw new NotFoundException('Grupo não encontrado.');
    }
    const name = body.name?.trim();
    if (!name) {
      throw new BadRequestException('Nome do grupo é obrigatório.');
    }
    return this.prisma.client.userGroup.update({
      where: { uuid },
      data: { name },
      select: { uuid: true, name: true, createdAt: true },
    });
  }

  @Delete('groups/:uuid')
  async deleteGroup(@CompanyUuid() companyUuid: string, @Param('uuid', ParseUUIDPipe) uuid: string) {
    const group = await this.prisma.client.userGroup.findFirst({
      where: { uuid, companyUuid },
    });
    if (!group) {
      throw new NotFoundException('Grupo não encontrado.');
    }
    await this.prisma.client.userGroup.delete({ where: { uuid } });
    return { ok: true };
  }

  @Post('groups/:uuid/members')
  async addMember(
    @CompanyUuid() companyUuid: string,
    @Param('uuid', ParseUUIDPipe) groupUuid: string,
    @Body() body: { userUuid: string },
  ) {
    const group = await this.prisma.client.userGroup.findFirst({
      where: { uuid: groupUuid, companyUuid },
    });
    if (!group) {
      throw new NotFoundException('Grupo não encontrado.');
    }
    const userUuid = body.userUuid;
    if (!userUuid) {
      throw new BadRequestException('userUuid é obrigatório.');
    }
    const user = await this.prisma.client.user.findFirst({
      where: { uuid: userUuid, companyUuid },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado nesta empresa.');
    }
    await this.prisma.client.userGroupMember.upsert({
      where: {
        userUuid_groupUuid: { userUuid, groupUuid },
      },
      create: { userUuid, groupUuid },
      update: {},
    });
    return { ok: true };
  }

  @Delete('groups/:uuid/members/:userUuid')
  async removeMember(
    @CompanyUuid() companyUuid: string,
    @Param('uuid', ParseUUIDPipe) groupUuid: string,
    @Param('userUuid', ParseUUIDPipe) userUuid: string,
  ) {
    const group = await this.prisma.client.userGroup.findFirst({
      where: { uuid: groupUuid, companyUuid },
    });
    if (!group) {
      throw new NotFoundException('Grupo não encontrado.');
    }
    await this.prisma.client.userGroupMember.deleteMany({
      where: { groupUuid, userUuid },
    });
    return { ok: true };
  }
}

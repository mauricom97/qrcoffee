import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { UserRole } from '@infrastructure/prisma/generated';

export type RequestUser = {
  uuid: string;
  email: string;
  name: string;
  role: UserRole;
  companyUuid: string;
  company: { name: string };
};

export const CompanyUuid = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<{ user: RequestUser }>();
    const user = request.user;
    if (!user?.companyUuid) {
      throw new Error('Company context not available');
    }
    return user.companyUuid;
  },
);

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUser => {
    const request = ctx.switchToHttp().getRequest<{ user: RequestUser }>();
    const user = request.user;
    if (!user) {
      throw new Error('User not authenticated');
    }
    return user;
  },
);

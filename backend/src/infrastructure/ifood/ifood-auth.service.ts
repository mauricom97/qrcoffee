import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { getIfoodConfig } from './ifood-config';

type TokenResponse = {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
};

@Injectable()
export class IfoodAuthService {
  private readonly logger = new Logger(IfoodAuthService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retorna access token válido para a empresa (refresh se necessário).
   * Usa credenciais da integração ou fallback das env vars.
   */
  async getAccessToken(companyUuid: string): Promise<string> {
    const client = this.prisma.client as any;
    const integration = await client.ifoodIntegration.findUnique({
      where: { companyUuid },
    });
    if (!integration) {
      throw new Error('Integração iFood não configurada');
    }

    const now = Date.now();
    const expiresAt = integration.tokenExpiresAt
      ? new Date(integration.tokenExpiresAt).getTime()
      : 0;
    if (integration.accessToken && expiresAt > now + 60_000) {
      return integration.accessToken as string;
    }

    const cfg = getIfoodConfig();
    const clientId = (integration.clientId || cfg.clientId || '').trim();
    const clientSecret = (integration.clientSecret || cfg.clientSecret || '').trim();
    if (!clientId || !clientSecret) {
      throw new Error('Credenciais iFood ausentes (clientId/clientSecret)');
    }

    const tokens = await this.requestClientCredentials(clientId, clientSecret);
    const tokenExpiresAt = tokens.expiresIn
      ? new Date(Date.now() + tokens.expiresIn * 1000)
      : new Date(Date.now() + 3600 * 1000);

    await client.ifoodIntegration.update({
      where: { companyUuid },
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken ?? integration.refreshToken,
        tokenExpiresAt,
      },
    });

    return tokens.accessToken;
  }

  private async requestClientCredentials(
    clientId: string,
    clientSecret: string,
  ): Promise<TokenResponse> {
    const { apiBaseUrl } = getIfoodConfig();
    const url = `${apiBaseUrl}/authentication/v1.0/oauth/token`;
    const body = new URLSearchParams({
      grantType: 'client_credentials',
      clientId,
      clientSecret,
    });
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      this.logger.error(`OAuth token failed: ${res.status} ${text}`);
      throw new Error(`Falha na autenticação iFood (${res.status})`);
    }
    const data = (await res.json()) as any;
    const accessToken = data.accessToken ?? data.access_token;
    if (!accessToken) {
      throw new Error('Resposta OAuth iFood sem accessToken');
    }
    return {
      accessToken,
      refreshToken: data.refreshToken ?? data.refresh_token,
      expiresIn: Number(data.expiresIn ?? data.expires_in) || 3600,
    };
  }
}

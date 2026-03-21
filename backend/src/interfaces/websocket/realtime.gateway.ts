import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

export const SOCKET_EVENTS = {
  PRODUCTS_UPDATE: 'products:update',
  ORDERS_UPDATE: 'orders:update',
  TABLES_UPDATE: 'tables:update',
  MENU_UPDATE: 'menu:update',
} as const;

const COMPANY_ROOM_PREFIX = 'company:';

@WebSocketGateway({
  cors: { origin: '*' },
  path: '/socket.io',
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RealtimeGateway.name);

  @WebSocketServer()
  server!: Server;

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: any) {
    try {
      const { token, companyUuid } = client.handshake?.auth ?? {};
      if (!token || !companyUuid) {
        this.logger.warn('Socket connection rejected: missing token or companyUuid');
        client.disconnect(true);
        return;
      }
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'qrcoffee-jwt-secret-change-in-production',
      });
      const room = `${COMPANY_ROOM_PREFIX}${companyUuid}`;
      client.join(room);
      client.data.companyUuid = companyUuid;
      this.logger.log(`Client connected to room ${room}`);
    } catch (err) {
      this.logger.warn('Socket connection rejected: invalid token');
      client.disconnect(true);
    }
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected from room company:${client.data?.companyUuid ?? 'unknown'}`);
  }

  emitToCompany(companyUuid: string, event: string) {
    const room = `${COMPANY_ROOM_PREFIX}${companyUuid}`;
    this.server.to(room).emit(event);
  }

  emitProductsUpdate(companyUuid: string) {
    this.emitToCompany(companyUuid, SOCKET_EVENTS.PRODUCTS_UPDATE);
  }

  emitOrdersUpdate(companyUuid: string) {
    this.emitToCompany(companyUuid, SOCKET_EVENTS.ORDERS_UPDATE);
  }

  emitTablesUpdate(companyUuid: string) {
    this.emitToCompany(companyUuid, SOCKET_EVENTS.TABLES_UPDATE);
  }

  emitMenuUpdate(companyUuid: string) {
    this.emitToCompany(companyUuid, SOCKET_EVENTS.MENU_UPDATE);
  }
}

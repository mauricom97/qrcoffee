// src/infrastructure/prisma/prisma.client.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import type { PoolConfig } from 'pg';
import { config } from 'dotenv';
import { PrismaClient } from './generated';

config();

const databaseUrl = process.env['DATABASE_URL_DEV'] || process.env['DATABASE_URL'];
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

function poolConfigForUrl(connectionString: string): PoolConfig {
  const url = new URL(connectionString.replace(/^postgresql:/, 'postgres:'));
  const isLocal = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);

  // Postgres local normalmente não usa TLS; sslmode=require quebra com certificado autoassinado.
  if (isLocal) {
    return { connectionString, ssl: false };
  }

  return { connectionString };
}

const adapter = new PrismaPg(poolConfigForUrl(databaseUrl));

const prisma = new PrismaClient({ adapter });
export { prisma };

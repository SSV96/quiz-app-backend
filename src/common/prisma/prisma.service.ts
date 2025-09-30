import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect().then(() => console.log('Database Connected Successfully'));
    } catch (error) {
      console.log('Failed to Connect Database', error);
    }
  }
  async onModuleDestroy() {
    try {
      await this.$disconnect().then(() => console.log('Database Disconnected Successfully'));
    } catch (error) {
      console.log('Failed to disconnect Database', error);
    }
  }
}

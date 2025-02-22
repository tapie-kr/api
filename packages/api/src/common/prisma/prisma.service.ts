import { Injectable, type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@tapie-kr/api-database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

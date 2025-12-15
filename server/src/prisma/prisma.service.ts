import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit(): Promise<void>{
    try {
        await this.$connect();
        console.log('Prisma connected to base');
  } catch (error) {
        console.error('Error connected to base:', error);
        throw error;
  }
    }
}
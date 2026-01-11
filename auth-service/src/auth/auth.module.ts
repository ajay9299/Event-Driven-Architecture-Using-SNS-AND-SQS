import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SqsService } from 'src/sqs/sqs.service';
import { SnsService } from 'src/sns/sns.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, SqsService, SnsService],
})
export class AuthModule {}

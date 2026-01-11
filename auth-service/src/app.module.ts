import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ContentModule } from './content/content.module';
import { SqsModule } from './sqs/sqs.module';
import { SnsModule } from './sns/sns.module';

@Module({
  imports: [AuthModule, ContentModule, SqsModule, SnsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

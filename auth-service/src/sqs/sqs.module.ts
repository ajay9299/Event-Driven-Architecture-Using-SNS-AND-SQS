import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { SqsConsumer } from './sqs.consumer';

@Module({
  providers: [SqsService, SqsConsumer]
})
export class SqsModule {}

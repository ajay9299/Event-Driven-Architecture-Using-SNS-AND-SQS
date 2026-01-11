import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ReceiveMessageCommand,
  DeleteMessageCommand,
  ChangeMessageVisibilityCommand,
} from '@aws-sdk/client-sqs';
import { sqsClient } from './sqs.client';

@Injectable()
export class SqsConsumer implements OnModuleInit {
  private queueUrl = 'http://localhost:4566/000000000000/auth-queue';

  async onModuleInit() {
    console.log('SQS Consumer started...');
    this.poll();
  }

  async poll() {
    try {
      const response = await sqsClient.send(
        new ReceiveMessageCommand({
          QueueUrl: this.queueUrl,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 20, // long polling
          VisibilityTimeout: 30,
        }),
      );

      if (response.Messages) {
        for (const msg of response.Messages) {

          const data = JSON.parse(msg.Body!);
          console.log('Received:',data);

          const notificationBody = JSON.parse(data.Message);
          console.log('Notification Body:', notificationBody);

        //   // ✅ simulate processing
        //   await new Promise((r) => setTimeout(r, 1000));

          // ✅ delete after success
          await sqsClient.send(
            new DeleteMessageCommand({
              QueueUrl: this.queueUrl,
              ReceiptHandle: msg.ReceiptHandle!,
            }),
          );
        }
      }
    } catch (err) {
      console.error('SQS error:', err);
    } finally {
      setImmediate(() => this.poll()); // continue polling
    }
  }
}

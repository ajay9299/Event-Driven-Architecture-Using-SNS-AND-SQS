import { Injectable } from '@nestjs/common';
import { sqsClient } from './sqs.client';
import { SendMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class SqsService {
    private readonly queueUrl: string = 'http://localhost:4566/000000000000/auth-queue';

    async sendMessage(data:any): Promise<void> {
        await sqsClient.send(
            new SendMessageCommand({
                QueueUrl: this.queueUrl,
                MessageBody: JSON.stringify(data)
            })
        )
    }
}
// "TopicArn": "arn:aws:sns:us-east-1:000000000000:user-events"
//   "QueueArn": "arn:aws:sqs:us-east-1:000000000000:auth-queue"
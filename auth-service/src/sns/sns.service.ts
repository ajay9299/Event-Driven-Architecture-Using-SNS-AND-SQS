import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./sns.client";

export class SnsService {
    private readonly snsArn = "arn:aws:sns:us-east-1:000000000000:user-events";

    async pushNotification(data:any): Promise<void> {
        console.log("Publishing to SNS:", data);
        await snsClient.send(
            new PublishCommand({
                TopicArn: this.snsArn,
                Message: JSON.stringify(data)
            })
        )
    }
} 
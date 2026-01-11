import { SNSClient } from "@aws-sdk/client-sns";

export const snsClient = new SNSClient({
    region:'us-east-1',
    endpoint: 'http://localhost:4566',
    credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test'
    }
})
SNS fan out architecture 

Evenet -> SNS -> SQS ( subcribe the SNS topic ) -> Action on that event -> Delete it under the visibility time

Note: 
1. Max size of payload can be <= 256Kb for both SNS and SQS
2. To send large payload -> Upload it to S3 -> pass s3KeyId to event payload 
3. To link the SNS to SQS.
    1. First we create the SNS topic (standard/FIFO).
    2. Create SQS and SNS subscribe that SQS.
    3. Allow SNS to sendMessage to SQS (Policy)
4. MessageGroupId is mandate to publish message in FIFO SNS 


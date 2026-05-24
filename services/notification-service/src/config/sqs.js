const { SQSClient } = require("@aws-sdk/client-sqs");

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION
});

console.log(
  "Notification-service SQS client initialized"
);

module.exports = sqsClient;

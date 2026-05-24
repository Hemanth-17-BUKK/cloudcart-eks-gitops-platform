const sqsClient = require("../config/sqs");

const {
  ReceiveMessageCommand,
  DeleteMessageCommand
} = require("@aws-sdk/client-sqs");

const pollMessages = async () => {
  try {

    const response = await sqsClient.send(
      new ReceiveMessageCommand({
        QueueUrl: process.env.SQS_QUEUE_URL,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10
      })
    );

    if (response.Messages) {

      for (const message of response.Messages) {

        console.log(
          "SQS message received:",
          message.Body
        );

        console.log(
          "Processing welcome notification..."
        );

        await sqsClient.send(
          new DeleteMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL,
            ReceiptHandle: message.ReceiptHandle
          })
        );

        console.log(
          "SQS message deleted successfully"
        );
      }
    }

  } catch (error) {

    console.error(
      "SQS polling error:",
      error
    );
  }
};

const startPolling = () => {

  console.log(
    "SQS polling worker started"
  );

  setInterval(
    pollMessages,
    5000
  );
};

module.exports = startPolling;

const { lambda_handler } = require("./../../index.js");

(function () {
  const event = JSON.stringify({
    Records: [
      {
        eventVersion: "2.0",
        eventSource: "aws:s3",
        awsRegion: "us-east-1",
        eventTime: "1970-01-01T00:00:00.123Z",
        eventName: "ObjectCreated:Put",
        userIdentity: {
          principalId: "EXAMPLE",
        },
        requestParameters: {
          sourceIPAddress: "127.0.0.1",
        },
        responseElements: {
          "x-amz-request-id": "C3D13FE58DE4C810",
          "x-amz-id-2":
            "FMyUVURIY8/IgAtTv8xRjskZQpcIZ9KG4V5Wp6S7S/JRWeUWerMUE5JgHvANOjpD",
        },
        s3: {
          s3SchemaVersion: "1.0",
          configurationId: "testConfigRule",
          bucket: {
            name: "faas-ocr-on-pdf",
            ownerIdentity: {
              principalId: "EXAMPLE",
            },
            arn: "arn:aws:s3:::mybucket",
          },
          object: {
            key: "test1.pdf",
            size: 1024,
            versionId: "version",
            eTag: "d41d8cd98f00b204e9800998ecf8427e",
            sequencer: "Happy Sequencer",
          },
        },
      },
    ],
  });

  const context = {};

  lambda_handler(event, context).then(
    (...args) => console.log("success: ", args),
    (...args) => console.error("error: ", args),
  );
})();

#!/usr/bin/env nodejs

var s3client = require("../../src/shared-s3-client");
var DownloadFileFromS3 = require("../../src/s3-to-file").DownloadFileFromS3;

async function TestDownloadFileFromS3() {
  try {
    await DownloadFileFromS3({
      event: JSON.stringify({
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
      }),
      vars: {
        s3Client: s3client,
      },
    });
  } catch (err) {
    console.error("Downloading failed", err);
  }
}

TestDownloadFileFromS3();

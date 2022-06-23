#!/usr/bin/env nodejs
var s3client = require("../../src/shared-s3-client");
var UploadPDFToS3 = require("../../src/pdf-to-s3").UploadPDFToS3;

async function TestUploadPDFToS3() {
    try {
      var job = {
        vars: {
            s3Bucket: s3client.bucket, // bucket where the file came from
            s3Key: "output.pdf", // s3 key of the file
            imageLocations: [], // locations of the images on disk
            pdfLocations: [], // locations of the generated pdf files
            finalPDFWithTextLocation: "./tests/pdf-to-s3/output.pdf", // location of the merged pdf with text
            metadata: {text: 'faas'},
        },
      };

      s3client.CreateS3Client(job);
      const resp = await UploadPDFToS3(job);
    } catch (err) {
        console.error("failed to UploadPDFToS3", err);
    }
}

TestUploadPDFToS3();

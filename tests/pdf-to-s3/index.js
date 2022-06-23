#!/usr/bin/env nodejs
var s3client = require("../../src/shared-s3-client");
var UploadPDFToS3 = require("../../src/pdf-to-s3").UploadPDFToS3;

async function TestUploadPDFToS3() {
    try {
      const resp = await UploadPDFToS3({
        vars: {
            s3Bucket: s3client.bucket, // bucket where the file came from
            s3Key: "output.pdf", // s3 key of the file
            s3client, // shared between upload/download
            imageLocations: [], // locations of the images on disk
            pdfLocations: [], // locations of the generated pdf files
            finalPDFWithTextLocation: "./tests/pdf-to-s3/output.pdf", // location of the merged pdf with text
            metadata: {text: 'faas'},
        },
      });
    } catch (err) {
        console.err("failed to UploadPDFToS3", err);
    }
    console.log("done");
}

TestUploadPDFToS3();

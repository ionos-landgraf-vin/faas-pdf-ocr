#!/usr/bin/env node

var pipeline = [
  DownloadFileFromS3,
  ConvertPDFtoImages,
  ExtractTextFromImageAndConvertToPDF,
  MergePagesToOnePDF,
  UploadPDFToS3,
];

exports.handler = async function (event, context) {
  var job = {
    event: event, // original from request
    context: context, // original from request
    vars: {
      localFilename: "", // location of the file on disk
      s3Location: "", // s3 location of the file
      s3client: null, // shared between upload/download
      imageLocations: [], // locations of the images on disk
      pdfLocations: [], // locations of the generated pdf files
      finalPDFWithTextLocation: "", // location of the merged pdf with text
      metadata: {},
    },
    env: process.env,
  };

  for (fn of pipeline) {
    fn(job);
  }

  console.log(JSON.stringify(job.vars.metadata));
};

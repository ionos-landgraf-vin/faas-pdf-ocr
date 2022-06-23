require("dotenv").config();

var DownloadFileFromS3 = require("./src/s3-to-file").DownloadFileFromS3,
  ConvertPDFtoImages = require("./src/get-img-from-pdf").ConvertPDFtoImages,
  ExtractTextFromImagesAndConvertToPDF =
    require("./src/image-to-pdf").ExtractTextFromImagesAndConvertToPDF,
  MergePagesToOnePDF = require("./src/pdf-merge").MergePagesToOnePDF,
  UploadPDFToS3 = require("./src/pdf-to-s3").UploadPDFToS3,
  CreateS3Client = require("./src/shared-s3-client").CreateS3Client,
  Cleanup = require("./src/cleanup").Cleanup,
  s3client = require("./src/shared-s3-client");

var pipeline = [
  CreateS3Client,
  DownloadFileFromS3,
  ConvertPDFtoImages,
  ExtractTextFromImagesAndConvertToPDF,
  MergePagesToOnePDF,
  UploadPDFToS3,
  // Cleanup,
];

exports.lambda_handler = async function (event, context) {
  var job = {
    event: event, // original from request
    context: context, // original from request
    vars: {
      localFilename: "", // location of the file on disk
      s3Bucket: "", // bucket where the file came from
      s3Key: "", // s3 key of the file
      s3Client: null, // shared between upload/download
      imageLocations: [], // locations of the images on disk
      pdfLocations: [], // locations of the generated pdf files
      finalPDFWithTextLocation: "", // location of the merged pdf with text
      metadata: {},
    },
    env: process.env,
  };

  for (fn of pipeline) {
    await fn(job);
  }

  console.log(JSON.stringify(job.vars.metadata));
};

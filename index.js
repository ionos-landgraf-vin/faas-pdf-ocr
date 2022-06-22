#!/usr/bin/env nodejs

var DownloadFileFromS3 = require("./src/s3-to-file").DownloadFileFromS3,
    ConvertPDFtoImages = async function() {},
    ExtractTextFromImageAndConvertToPDF = async function() {},
    MergePagesToOnePDF = async function() {},
    UploadPDFToS3 = async function() {},
    s3client = require("./src/shared-s3-client");

var pipeline = [
    DownloadFileFromS3,
    ConvertPDFtoImages,
    ExtractTextFromImageAndConvertToPDF,
    MergePagesToOnePDF,
    UploadPDFToS3,
];

exports.handler = async function(event, context) {
    var job = {
        event: event, // original from request
        context: context, // original from request
        vars: {
            localFilename: "", // location of the file on disk
            s3Location: "", // s3 location of the file
            s3client: s3client, // shared between upload/download
            imageLocations: [], // locations of the images on disk
            pdfLocations: [], // locations of the generated pdf files
            finalPDFWithTextLocation: "", // location of the merged pdf with text
            metadata: {},
        },
        env: process.env,
    };

    for(fn of pipeline) {
        await fn(job);
    }

    console.log(JSON.stringify(job.vars.metadata));
};

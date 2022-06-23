#!/usr/bin/env nodejs
var s3client = require("../../src/shared-s3-client");
var UploadPDFToS3 = require("../../src/pdf-to-s3").UploadPDFToS3;

//job setzen
var job = {
        vars: {
            localFilename: "", // location of the file on disk
            s3Location: "", // s3 location of the file
            s3client, // shared between upload/download
            imageLocations: [], // locations of the images on disk
            pdfLocations: [], // locations of the generated pdf files
            finalPDFWithTextLocation: "./output.pdf", // location of the merged pdf with text
            metadata: {text: 'faas'},
        },
        
        env: process.env,
    };

UploadPDFToS3(job);




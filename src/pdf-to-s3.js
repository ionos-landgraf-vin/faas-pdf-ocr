var ssc = require("./shared-s3-client");


// 
exports.UploadPDFToS3 = function(job) {

var params = {
  localFile: job.vars.finalPDFWithTextLocation,
 
  s3Params: {
    Bucket: ssc.bucket,
    Key: 'API Key.txt',
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};

var uploader = client.uploadFile(params);
uploader.on('error', function(err) {
  console.error("unable to upload:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressMd5Amount,
            uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});
}

